import { Component, inject } from '@angular/core';
import { AuthService, PostService, ThemeService } from '../../../core/services';
import { Observable } from 'rxjs';
import { Theme } from '../../../models/theme.model';
import { Post } from '../../../models/post.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CatalogItem } from '../catalog-item/catalog-item';

@Component({
  selector: 'app-catalog',
  imports: [CommonModule, CatalogItem,],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class Catalog {

  private authService = inject(AuthService);
  readonly isLoggedIn = this.authService.isLoggedIn;
  
  themes$: Observable<Theme[]>
  posts$: Observable<Post[]>; 

  constructor(
    private themeService: ThemeService,
    private postService: PostService ) {
  
    this.themes$ = this.themeService.getThemes();    
    this.posts$ = this.postService.getPosts();    
  }
  // TODO unsuscribe
}
