import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.services';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  private authService = inject(AuthService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  registerForm: FormGroup;

  constructor(){
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      tel: [''],
      passwords: this.formBuilder.group({ // създаване на група в групата със собствени разклонения
        password: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
        rePassword: ['', [Validators.required, this.passwordMatchValidator]]
      })
    })
  }

  get username(): AbstractControl<any, any> | null {
    return this.registerForm.get('username')
  }
  
  get email(): AbstractControl<any, any> | null {
    return this.registerForm.get('email')
  }

  get tel(): AbstractControl<any, any> | null {
    return this.registerForm.get('tel')
  }


  // Abstract controls не са FormGroup и не се достъпват директно
  get passwords(): FormGroup<any> {
    return this.registerForm.get('passwords') as FormGroup;
  }

  get password(): AbstractControl<any, any> | null {
    return this.passwords.get('password');
  }
  get rePassword(): AbstractControl<any, any> | null {
    return this.passwords.get('rePassword')
  }

  get isPasswordsValid(): boolean {
    return this.passwords?.invalid && (this.password?.dirty || this.password?.touched) || false
  }
  get isUsernameValid(): boolean {
    return this.username?.invalid && (this.username?.dirty || this.username?.touched) || false
  }

  get isEmailValid(): boolean {     
    return this.email?.invalid && (this.email?.dirty || this.email?.touched) || false
  }

  get usernameErrorMsg(): string {
    if (this.username?.errors?.['required']) {
      return 'Username is required'
    }
    if (this.username?.errors?.['minlength']) {
      return 'Username must be more than 5 letters'
    }
    return ''
  }

  get emailErrorMsg(): string {

    if (this.email?.errors?.['required']) {
      return 'Email is required'
    }
    if (this.email?.errors?.['pattern']) {
      return 'Email must be valid'
    }
    return ''
  }

  get telErrorMsg() {
    if (this.tel?.errors?.['required']) {
      return 'tel is required'
    }
    if (this.tel?.errors?.['minlength']) {
      return 'tel must be correct!'
    }
    return ''
  }

  get passwordErrorMsg() {
    if (this.password?.errors?.['required']) {
      return 'Password is required'
    }
    if (this.password?.errors?.['minlength']) {
      return 'Password must be at least 5 symbols'
    }
    if(this.password?.errors?.['pattern']){
      return 'Password must be only latin alphabet and digits'
    }
    return ''
  }

  get rePasswordErrorMsg() {

    if (this.rePassword?.errors?.['required']) {
      return 'Repeat the password please'
    }
    if (this.rePassword?.errors?.['minlength']) {
      return 'Passwords must be at least 5 letters'
    }
    if (this.rePassword?.errors?.['passwordMismatch']){
      return 'Passwords must be identical'
    }
    return ''
  }

  usernameError: boolean = false;
  emailError: boolean = false;
  telError: boolean = false;
  passwordError: boolean = false;
  rePasswordError: boolean = false;
  
  private passwordMatchValidator(passwordsControl: AbstractControl): ValidationErrors | null {
        // control: AbstractControl е връзката със всички controls в registerForm което референция към FormGroup
    const password = passwordsControl.get('password');
    const rePassword = passwordsControl.get('rePassword');

    if(password && rePassword && password.value !== rePassword.value){
      return { passwordMismatch: true}
    }
    return null;
  }

  onSubmit(): void { 
    
    const { username, email, tel } = this.registerForm.value;
    const { password, rePassword } = this.registerForm.value.passwords;

    const response = this.authService.register(
      username,
      email,
      tel,
      password,
      rePassword).subscribe({
        next: () => {
          this.router.navigate(['/home']);          
        },
        error: (err) => {
          console.log('Registration failed', err)
          this.markFormGroupTouched();
        }
      });
    }

    // маркиране на всички полета като touched,  за да се запази формата ако при Async операции се появят грешки
      private markFormGroupTouched(): void { 
        Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        if (control instanceof FormGroup) {
          Object.keys(control.controls).forEach(nestedKey => {
            const nestedControl = control.get(nestedKey);
            nestedControl?.markAllAsTouched();
          })
        } else {
          control?.markAsUntouched();
        }
        control?.markAsTouched();
    })
  }
}
