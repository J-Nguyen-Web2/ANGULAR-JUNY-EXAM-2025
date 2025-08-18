import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService, PostService, ThemeService } from '../../../core/services';
import { map, Observable, switchMap } from 'rxjs';
import { Post, Theme } from '../../../models';
import { TimeAgoPipe } from '../../../shared/pipe/time-ago.pipe';

@Component({
  selector: 'app-guide-content',
  imports: [CommonModule, FormsModule, TimeAgoPipe],
  templateUrl: './guide-content.html',
  styleUrl: './guide-content.css'
})
export class GuideContent implements OnInit{
  private route = inject(ActivatedRoute);
  protected authService = inject(AuthService)

  
  themeGuide$!: Observable<Theme>;
  posts$?: Observable<Post[]>;
 

constructor(
    private themeService: ThemeService,
    private postService: PostService,
    
  ) {}

    ngOnInit(): void {
      this.themeGuide$ = this.route.paramMap.pipe( // за да може да се работи с observeble понеже е async
        switchMap( params => { // понеже е async, а са два Observeble-a (themeId) и theme$ 
        const themeId = params.get('themeId')!; // switchMap се unsuscribe от първия
        return  this.themeService.getThemeById(themeId); // за да се subscribe за втория
        })
      );
          

    this.posts$ = this.themeGuide$.pipe(
      map(theme => theme.posts ?? [])
    )
    this.posts$.subscribe(posts => console.log(posts))
    this.themeGuide$.subscribe(theme => console.log(theme.userId.email))
    };
}