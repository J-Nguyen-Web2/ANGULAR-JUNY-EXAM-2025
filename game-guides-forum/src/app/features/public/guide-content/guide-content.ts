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
export class GuideContent implements OnInit{  
  
  // themeGuide$!: Observable<Theme>;
  // themeCreator$!: Observable<User>
  // posts$?: Observable<Post[]>;
  posts = signal<Post[]>([]);
  themeGuide = signal<Theme| null>(null);
  themeCreator = signal<string | null>(null);

  postForm!: FormGroup;
  editForm!: FormGroup;

  newPostText='';
  editingPostId: string | null = null

constructor(  
  protected authService: AuthService,  
  private themeService: ThemeService,
  private postService: PostService,
  private formBuilder: FormBuilder,
  private route: ActivatedRoute,
  private router: Router, 
  ) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      postText: ['',[Validators.required, Validators.minLength(10)]]
    });

    this.route.paramMap.subscribe(params => {
      const themeId = params.get('themeId')!;
      this.themeService.getThemeById(themeId).subscribe(theme => {
        this.themeGuide.set(theme);
        this.posts.set(theme.posts ?? []);
        // this.themeCreator.set(theme.userId)
      })
    })
  }

  addPost() {
    if(this.postForm.invalid){
      return
    }

    const postText = this.postForm.value.postText;
    const themeId = this.themeGuide()?._id;
    if(!themeId){
      return
    }

    this.postService.createPost(themeId, postText).subscribe({
      // прибаване на поста към сигнала на масива от постове
      // next: (createdPost) => {        
      //   this.posts.update(posts =>[...posts, createdPost]);
      //   console.log(createdPost)
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
      if(!themeId) {
        return
      }

      this.postService.deletePost(themeId, postId).subscribe({
        next: () => {
          this.posts.update(posts => posts.filter(p => p._id !== postId));
        },
        error: (err) => console.error('Failed to delete post', err)
      })
    }
  

  // с observables
  //   ngOnInit(): void {
  //     this.themeGuide$ = this.route.paramMap.pipe( // за да може да се работи с observeble понеже е async
  //       switchMap( params => { // понеже е async, а са два Observeble-a (themeId) и theme$ 
  //       const themeId = params.get('themeId')!; // switchMap се unsuscribe от първия
  //       return  this.themeService.getThemeById(themeId); // за да се subscribe за втория
  //       })
  //     );
          

  //   this.posts$ = this.themeGuide$.pipe(
  //     map(theme => theme.posts ?? [])
  //   )

  //   this.themeCreator$ = this.themeGuide$.pipe(
  //     map( theme => theme.userId)
  //   )

  //   this.postForm = this.formBuilder.group({
  //     postText: ['',[Validators.required, Validators.minLength(10)]]
  //   });
  // }

  //   addPost() {
  //     if(this.postForm.invalid){
  //       return;
  //     }
    

  //   const postText = this.postForm.value.postText;

  //    this.themeGuide$.pipe(
  //     switchMap(theme => this.postService.createPost(theme._id, postText))
  //   ).subscribe({
  //     next: (createdPost) => {
  //       console.log('Post created:', createdPost);

  //       this.postForm.reset();

  //       this.posts$ = this.themeGuide$.pipe(
  //         map(theme => theme.posts ?? [])
  //       );
  //     },
  //     error: (err) => {
  //       console.error('Failed to create post:', err);
  //     }
  //   });
  // }
}