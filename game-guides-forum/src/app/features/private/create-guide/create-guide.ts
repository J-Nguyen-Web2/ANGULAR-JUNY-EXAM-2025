import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.services';
import { Router } from '@angular/router';
import { ThemeService } from '../../../core/services';

@Component({
  selector: 'app-create-guide',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './create-guide.html',
  styleUrl: './create-guide.css'
})
export class CreateGuide {

  private themeService = inject(ThemeService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  createForm: FormGroup;

  constructor(){
    this.createForm = this.formBuilder.group({
      themeName: ['',[
        Validators.required, 
        Validators.minLength(5),] 
      ],
      postText: ['',[
        Validators.required, 
        Validators.minLength(5)]]
    });
  }
  
  get themeName(): AbstractControl<any, any> | null { 
    return this.createForm.get('themeName');
  }

  get postText(): AbstractControl<any, any> | null {
    return this.createForm.get('postText');
  }

  get themeNameErrorMsg(): string {
    if(this.themeName?.errors?.['required']){
      return 'Title is required';
    } 
    if (this.themeName?.errors?.['minlength']){ 
      return 'Title is not valid';
    }    
    return '';
  }

  get postTextErrorMsg(): string {
    if(this.postText?.errors?.['required']){ 
      return 'Description is required';
    } 
    if (this.postText?.errors?.['minlength']){
      return 'Text must be at least 5 symbols';
    }    
    return '';
  }

  get isThemeNameValid(): boolean {     
    return this.themeName?.invalid && (this.themeName?.dirty || this.themeName?.touched) || false
  }

  get isPostTextValid(): boolean {
    return this.postText?.invalid && (this.postText?.dirty || this.postText?.touched) || false
  }

  onSubmit(): void {

    if (this.createForm.valid) {
      const { themeName, postText } = this.createForm.value

      this.themeService.createTheme(themeName, postText).subscribe({
          next: () => {
            this.router.navigate(['/catalog']);
          },
          error: (err) => {
            console.error('New theme failed', err);
          }
        });
    }
  }
}