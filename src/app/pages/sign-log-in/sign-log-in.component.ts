import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { AuthenticateService } from '../../services/authenticate/authenticate.service';

@Component({
  selector: 'app-sign-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-log-in.component.html',
  styleUrl: '/src/scss/pages/sign-log-in.scss'
})
export class SignLogInComponent {
  loginForm: FormGroup;
  userExists: boolean | null = null; // null: not checked, true: exists, false: doesn't exist
  emailVerified = false; // to check if the email has been verified


  constructor(private formBuilder: FormBuilder, private authenticateService: AuthenticateService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, this.emailValidator]],
      password: [''],
      firstName: [''],
      lastName: [''],
      phone: ['']
    });

    // if the email is modified, reset the form because the email must be verified again
    this.loginForm.get('email')?.valueChanges.subscribe(value => {
      if (this.emailVerified) {
        this.resetForm();
      }
    });
  }

  get emailFC() {
    return this.loginForm.get('email') as FormControl<string>;
  }

  get passwordFC() {
    return this.loginForm.get('password') as FormControl<string>;
  }

  get firstNameFC() {
    return this.loginForm.get('firstName') as FormControl<string>;
  }

  get lastNameFC() {
    return this.loginForm.get('lastName') as FormControl<string>;
  }

  get phoneFC() {
    return this.loginForm.get('phone') as FormControl<string>;
  }


  emailValidator(control: AbstractControl): ValidationErrors | null {
    const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegexp.test(control.value) ? null : { email: true };
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegexp.test(control.value) ? null : { email: true };
  }


  /*isPasswordValid(): boolean {
    const password = this.loginForm.get('password')?.value;
    if (!password) return false;

    // Utilisation d'une expression régulière pour la validation du mot de passe
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;

    return passwordRegex.test(password);
  }*/


  checkEmail()
  {
    if (this.loginForm.get('email')?.invalid) {
      // if the email is invalid, don't check the user existence
      return;
    }

    this.authenticateService.checkEmail(this.loginForm.get('email')?.value).subscribe({
      next: result => {
        this.userExists = result;
        this.displayForm();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  displayForm()
  {
    if (this.userExists) {
      // if the user exists, only the password is required
      this.emailFC.setValidators([Validators.required]);
    } else {
      // if the user doesn't exist, all fields are required
      this.passwordFC.setValidators([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]);
      this.firstNameFC.setValidators([Validators.required]);
      this.lastNameFC.setValidators([Validators.required]);
      this.phoneFC.setValidators([Validators.required, Validators.pattern(/^\+?[1-9]\d{0,2}(\s?\d\s?){4,14}$/)]);
    }

    this.loginForm.updateValueAndValidity();
    this.emailVerified = true;
  }


  // reset the form to its initial state if the email is modified
  resetForm() {
    this.userExists = null;
    this.emailVerified = false;
    this.loginForm.reset({
      email: this.emailFC.value
    });
    this.passwordFC.clearValidators();
    this.firstNameFC.clearValidators();
    this.lastNameFC.clearValidators();
    this.phoneFC.clearValidators();
    this.loginForm.updateValueAndValidity();
  }


  onSubmit() {
    if (this.userExists) {
      // Connexion
      console.log('Connexion:', this.loginForm.value);
    } else {
      // Inscription
      this.authenticateService.signupUser(this.loginForm.value).subscribe({
        next: result => {
          if (result) {
            console.log('Inscription réussie:', this.loginForm.value);
          } else {
            console.error('Erreur lors de l\'inscription');
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }
}

