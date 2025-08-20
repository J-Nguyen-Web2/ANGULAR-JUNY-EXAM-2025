import { Component, computed, inject, effect, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.services';
import { ErrorService } from '../../../core/services/error.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private authService = inject(AuthService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private errorService = inject(ErrorService)

  errorMessage = computed(() => this.errorService.error());
  
  
  
  loginForm: FormGroup;

  constructor(){
    
    effect((): void => { // в комнинация със сигнала computed
      const msg = this.errorMessage();
      if(msg){
        console.log('Error:', msg)
      }
    })


    this.loginForm = this.formBuilder.group({
      email: ['',[
        Validators.required, 
        Validators.email,] 
      ], 
      
      password: ['',[Validators.required, Validators.minLength(5)]]
    });
  }
  
  get email(): AbstractControl<any, any> | null { 
    return this.loginForm.get('email');
  }

  get password(): AbstractControl<any, any> | null {
    return this.loginForm.get('password');
  }

  get emailErrorMsg(): string {
    if(this.email?.errors?.['required']){ // от типа на key, value ще се върне стойността му
      return 'Email is required';
    } 
    if (this.email?.errors?.['email']){
      return 'Email is not valid';
    }    
    return '';
  }

  get passwordErrorMsg(): string {
    if(this.password?.errors?.['required']){
      return 'Passwords is required';
    } 
    if (this.password?.errors?.['minlength']){
      return 'Password must be at least 5 symbols';
    }    
    return '';
  }

  get isEmailValid(): boolean {     
    return this.email?.invalid && (this.email?.dirty || this.email?.touched) || false
  }

  get isPasswordValid(): boolean {
    return this.password?.invalid && (this.password?.dirty || this.password?.touched) || false
  }

  toastMessage = signal<string |null>(null);

  showToast(message: string) {
    this.toastMessage.set(message);
    setTimeout(() => this.toastMessage.set(null), 5000)
  }

 onSubmit(): void {

  if(!this.loginForm.valid){
    this.markFormGroupTouched();
    return
  }
    
    if(this.loginForm.valid){ 
      const { email, password } = this.loginForm.value
      
      this.authService.login(email, password).subscribe({
          next: () => {
            this.router.navigate(['/home']);
          },
          error: (err) => {
            if (err.status === 404 ) {
              this.showToast('No such user in the database!')
            } else if (err.status === 401) {
              this.showToast('Information you provide is not correct!')              
            } else {
              this.showToast('Login failed. Please try again.')              
            }
            this.markFormGroupTouched();
          }
        })
    }
  }

  private markFormGroupTouched(): void { 
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched(); // вътрешен метод
    })
  }
  
}
