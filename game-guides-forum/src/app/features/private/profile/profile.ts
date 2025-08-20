import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.services';

@Component({
  selector: 'app-profile',
  imports: [ FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
    
  public authService = inject(AuthService);
  private router = inject(Router);

  public currentUser = this.authService.currentUser;
  readonly isLoggedIn = this.authService.isLoggedIn;
  
}
