import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.services';

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

  loginForm: FormGroup;

  constructor(){
    this.loginForm = this.formBuilder.group({ // formBuilder съкратява синтаксиса
      email: ['',[
        Validators.required, 
        Validators.email,] // e вграден валидатор за email-и дали съдържат определени символи
      //  Validators.pattern(/^(?=.{6,})[a-zA-Z][a-zA-Z0-9._-]*@gmail\.(com|bg)$/) // патерна ще провери дали съответства на стойността
      // сложен е email Validator направен от нас
      ], 
      
      password: ['',[Validators.required, Validators.minLength(5)]]
    });
  }
  
  get email(): AbstractControl<any, any> | null { // гетери взимащи стойностите от loginForm и ги правят ABstract Form
    return this.loginForm.get('email');
  }

  get password(): AbstractControl<any, any> | null {
    return this.loginForm.get('password');
  }

  get emailErrorMsg(): string {
    if(this.email?.errors?.['required']){ // от типа на key, value ще се върне стойността му
      return 'Email is required';
    } 
    if (this.email?.errors?.['emailValidator']){ // създаден от нас по-надолу влиза в errors тъй като е клас ValidatorErrors 
    // (this.email?.errors?.['patern']){ // Validators.patern по-горе има зададена стойност която ще провери
      return 'Email is not valid';
    }    
    return '';
  }

  get passwordErrorMsg(): string {
    if(this.password?.errors?.['required']){ // от типа на key, value ще се върне стойността му
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

 onSubmit(): void {
    
    if(this.loginForm.valid){ 
      const { email, password } = this.loginForm.value
      
      this.authService.login(email, password).subscribe({
          next: () => {
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.log('Login failed', err)
            this.markFormGroupTouched();
          }
        })
    }
  }

  private markFormGroupTouched(): void { // маркиране на няколко контрола като touched за да може да се визуализират грешките
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched(); // вътрешен метод
    })
  }

  private isValidEmail(email: string): boolean { // с учебна цел email Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email); // ще сравни regex-a с подадения string
  }
  
}
