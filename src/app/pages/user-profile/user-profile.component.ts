import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { UserProfile } from '../../models/user.model';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: '/src/scss/pages/user-profile.scss'
})
export class UserProfiletComponent {
  mode: string = 'view';
  userProfile = new UserProfile();
  userProfileForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.userService.getProfile().subscribe({
      next: (user: UserProfile) => {
        this.userProfile = user;
      },
      error: (error: any) => {
        console.error(error);
      }
    });

    this.userProfileForm = this.formBuilder.group({
      email: [null],
      first_name: [null],
      last_name: [null],
      phone_number: [null],
    });
  }

  get form() { return this.userProfileForm.controls; }

  clearAllValidators() {
    this.form['email'].clearValidators();
    this.form['first_name'].clearValidators();
    this.form['last_name'].clearValidators();
    this.form['phone_number'].clearValidators();
    this.userProfileForm.updateValueAndValidity();
  }

  // Admin management
  editProfile() {
    this.mode = 'edit';

    this.form['email'].setValue(this.userProfile.email);
    this.form['first_name'].setValue(this.userProfile.firstName);
    this.form['last_name'].setValue(this.userProfile.lastName);
    this.form['phone_number'].setValue(this.userProfile.phone);

    this.form['first_name'].setValidators([Validators.required, Validators.pattern('[a-zA-Z ]*')]);
    this.form['last_name'].setValidators([Validators.required, Validators.pattern('[a-zA-Z ]*')]);
    this.form['phone_number'].setValidators([Validators.required, Validators.pattern(/^\+?[1-9]\d{0,2}(\s?\d\s?){4,14}$/)]);
    this.userProfileForm.updateValueAndValidity();
  }

  saveUserProfile() {
    let newUserProfile = { ...this.userProfile, ...this.userProfileForm.value }; // merge userProfile and userProfileForm
    this.userService.updateProfile(newUserProfile).subscribe({
      next: (user: UserProfile) => {
        this.userProfile = user;
        this.mode = 'view';
        this.userProfileForm.reset();
        this.clearAllValidators();
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
}
