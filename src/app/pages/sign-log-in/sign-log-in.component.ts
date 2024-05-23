import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { AuthenticateService } from '../../services/authenticate/authenticate.service';

@Component({
  selector: 'app-sign-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-log-in.component.html',
  styleUrl: '/src/scss/components/sign-log-in.scss'
})

export class SignLogInComponent {
  loginForm: FormGroup;
  userExists: boolean | null = null; // null: not checked, true: exists, false: doesn't exist
  emailVerified = false; // to check if the email has been verified
  justregistered = false;
  authSuccess = false;
  infoTitle = '';
  infoMessage = '';


  constructor(private formBuilder: FormBuilder, private authenticateService: AuthenticateService) {
    // create the form
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, this.emailValidator]],
      password: [''],
      firstName: [''],
      lastName: [''],
      phone: ['']
    });

    // if the email is modified, reset the form because the email must be verified again
    this.loginForm.get('email')?.valueChanges.subscribe(value => {
      if (this.emailVerified && !this.authSuccess) {
        this.resetForm();
      }
    });

    // display the div.info according to the state of the form (email verified, user exists, auth success)
    this.information();
  }

  get emailFC() {
    return this.loginForm.controls['email'] as FormControl<string>;
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

  information() {
    // display the div.info according to the state of the form (email verified, user exists, auth success)
    if (this.emailVerified === false){
      this.infoTitle = "Vérification d'email";
      this.infoMessage = "Veuillez saisir votre email";
    } else if (this.userExists === true && this.authSuccess === false) {
      this.infoTitle = "Connexion";
      this.infoMessage = (this.justregistered === false) ? "Veuillez saisir votre mot de passe" : "Vous êtes inscrit, veuillez vous connecter";
    } else if (this.userExists === true && this.authSuccess === true) {
      this.infoTitle = "Connexion résussie";
      this.infoMessage = "Veuillez fermer cette boîte de dialogue";
    } else {
      this.infoTitle = "Inscription";
      this.infoMessage = "Veuillez saisir les informations demandées";
    }
  }


  emailValidator(control: AbstractControl): ValidationErrors | null {
    const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegexp.test(control.value) ? null : { email: true };
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegexp.test(control.value) ? null : { email: true };
  }


  // check if the email exists before displaying the form
  checkEmail()
  {
    if (this.loginForm.get('email')?.invalid) {
      // if the email is invalid, don't check the user existence
      return;
    }

    this.authenticateService.checkEmail(this.loginForm.get('email')?.value).subscribe({
      next: result => {
        this.userExists = result;
        this.emailVerified = true;
        this.displayForm();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  // display the form according to the state of the user
  displayForm()
  {
    if (this.userExists) {
      // if the user exists, only the password is required
      this.passwordFC.setValidators([Validators.required]);
    } else {
      // if the user doesn't exist, all fields are required
      this.passwordFC.setValidators([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]);
      this.firstNameFC.setValidators([Validators.required]);
      this.lastNameFC.setValidators([Validators.required]);
      this.phoneFC.setValidators([Validators.required, Validators.pattern(/^\+?[1-9]\d{0,2}(\s?\d\s?){4,14}$/)]);
    }

    this.loginForm.updateValueAndValidity();
    this.information();
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

    this.information();
  }


  // submit the form
  onSubmit() {
    // Authentification (Login)
    if (this.userExists) {
      this.authenticateService.loginUser(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: result => {
          if (result) {
            // if the user is authenticated, display the success message
            this.authSuccess = true;
            this.information();
          } else {
            console.error('Erreur lors de la connexion');
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      // Inscription (Signup)
      this.authenticateService.signupUser(this.loginForm.value).subscribe({
        next: result => {
          if (result) {
            // if the user is registered, display the success message
            this.justregistered = true;
            this.userExists = true;
            this.displayForm();
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

