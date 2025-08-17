import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService, PostService, ThemeService } from '../../../core/services';
import { Observable } from 'rxjs';
import { Post, Theme } from '../../../models';

@Component({
  selector: 'app-guide-content',
  imports: [CommonModule, FormsModule],
  templateUrl: './guide-content.html',
  styleUrl: './guide-content.css'
})
export class GuideContent implements OnInit{
  private route = inject(ActivatedRoute);
  protected authService = inject(AuthService)

  
  theme?: Theme;
  posts: Post[] = [];
 

constructor(
    private themeService: ThemeService,
    private postService: PostService,
  ) {}

   ngOnInit(): void {
    // Get theme ID from route params
    this.route.params.subscribe(params => {
      const themeId = params['themeId'];
      if (themeId) {
        this.themeService.getThemeById('themeId').subscribe(theme => {
          this.theme = theme})
        } 
      }
    )};          
  
}