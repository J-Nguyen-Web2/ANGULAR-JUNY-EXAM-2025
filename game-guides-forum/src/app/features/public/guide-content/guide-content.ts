import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, PostService, ThemeService } from '../../../core/services';
import { map, Observable, switchMap } from 'rxjs';
import { Post, Theme, User } from '../../../models';
import { TimeAgoPipe } from '../../../shared/pipe/time-ago.pipe';

@Component({
  selector: 'app-guide-content',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './guide-content.html',
  styleUrl: './guide-content.css'
})
export class GuideContent implements OnInit {

  // themeGuide$!: Observable<Theme>;
  // themeCreator$!: Observable<User>
  // posts$?: Observable<Post[]>;
  // // themeCreator = signal<string | null>(null);
  posts = signal<Post[]>([]);
  themeGuide = signal<Theme | null>(null);


  editingTheme = false;
  themeEditForm!: FormGroup;
  postForm!: FormGroup;
  editForm!: FormGroup;

  newPostText = '';
  editingPostId: string | null = null
  editingText: string = '';

  constructor(
    protected authService: AuthService,
    private themeService: ThemeService,
    private postService: PostService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.themeEditForm = this.formBuilder.group({
      themeName: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      postText: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.editForm = this.formBuilder.group({
      editText: ['', [Validators.required, Validators.minLength(10)]]
    })

    this.route.paramMap.subscribe(params => {
      const themeId = params.get('themeId')!;
      this.themeService.getThemeById(themeId).subscribe(theme => {
        this.themeGuide.set(theme);
        console.log(theme.userId)
        console.log(this.authService.currentUser()?._id)
        this.posts.set(theme.posts ?? []);
      })
    })
  }

  // --------- THEME -----------
  startThemeEdit() {
    if (!this.isThemeOwner()) return;
    this.editingTheme = true;
    this.themeEditForm.patchValue({
      themeName: this.themeGuide()?.themeName
    });
  }

  saveTheme() {
    if (this.themeEditForm.invalid || !this.themeGuide()) return;

    // извикване на сървиса за save със spread
    const updatedTheme = {
      ...this.themeGuide()!,
      themeName: this.themeEditForm.value.themeName
    };
    this.themeService.updateTheme(updatedTheme).subscribe({
      next: (theme) => {
        this.themeGuide.set(theme);
        this.editingTheme = false;
      },
      error: (err) => console.error('Failed to update', err)
    });
  }

  // server-a не позволява
  deleteTheme() {
    const themeId = this.themeGuide()?._id
    if (!themeId) return;

    if (!this.isThemeOwner()) return;

    this.themeService.deleteTheme(themeId).subscribe({
      next: () => {
        this.router.navigate(['/themes']);
      },
      error: (err) => console.error('Failed to delete theme', err)
    });
  }

  cancelThemeEdit() {
    this.editingTheme = false;
  }

  isThemeOwner(): boolean {
    const currentUserId = this.authService.currentUser()?._id;
    const themeUserId = this.themeGuide()?.userId?._id || this.themeGuide()?.userId;
    return themeUserId === currentUserId;
  }
  
  // -------- POSTS ---------
  addPost() {
    if (this.postForm.invalid) return;

    const postText = this.postForm.value.postText;
    const themeId = this.themeGuide()?._id;
    if (!themeId) return;

    this.postService.createPost(themeId, postText).subscribe({
      // прибаване на поста към сигнала на масива от постове
      // next: (createdPost) => {        
      //   this.posts.update(posts =>[...posts, createdPost]);
      //   this.postForm.reset();
      // },

      // refecth понеже не зарежда веднага новия пост
      next: () => {
        this.themeService.getThemeById(themeId).subscribe(theme => {
          this.themeGuide.set(theme);
          this.posts.set(theme.posts ?? [])
        });
        this.postForm.reset();
      },
      error: (err) => console.error('Failed to create post:', err)
    })
  }

  deletePost(postId: string) {
    const themeId = this.themeGuide()?._id;
    if (!themeId) return;

    this.postService.deletePost(themeId, postId).subscribe({
      next: () => {
        this.posts.update(posts => posts.filter(p => p._id !== postId));
      },
      error: (err) => console.error('Failed to delete post', err)
    });
  }

  startEditing(postId: string, currentText: string, postUserId: string) {
    if (postUserId !== this.authService.currentUser()?._id) return;
    this.editingPostId = postId;
    this.editingText = currentText;
    this.editForm.patchValue({ editText: currentText })

  }

  cancelEdit() {
    this.editingPostId = null;
    this.editingText = '';
  }

  editPost(postId: string) {
    const themeId = this.themeGuide()?._id;
    if (!themeId) return;

    const newText = this.editForm.value.editText
    if (!newText?.trim()) return;

    this.postService.editPost(themeId, postId, newText).subscribe({
      next: (updatedPost) => {
        this.posts.update(posts =>
          posts.map(p => p._id === updatedPost._id ? updatedPost : p)
        );
        
            window.location.reload()
          ;

        this.editingPostId = null;
        this.editingText = '';
      },
      error: (err) => console.error('Failed to edit post', err)
    });
  }

  isPostOwner(post: Post): boolean {
    const currentUserId = this.authService.currentUser()?._id;
    if(!currentUserId) return false;

    const postUserId = typeof  post.userId === 'string'
    ? post.userId
    : post.userId?._id;
    
    console.log(postUserId === currentUserId)

    return postUserId === currentUserId;
  }
}