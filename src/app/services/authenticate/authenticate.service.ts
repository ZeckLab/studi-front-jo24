import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private isAuthenticated = (localStorage.getItem('access_token')!=null);     // waiting best solution
  private accessToken: string | null = null;
  private statusAuthListener = new Subject<boolean>();

  endpointURL = environment.api;

  constructor(private httpClient: HttpClient, private router: Router){
  }

  // get the token
  get getToken(){
    return this.accessToken;
  }

  get getIsAuthenticated(){
    return this.isAuthenticated;
  }

  // get the status of the authentication
  get getStatusAuthListener(){
    return this.statusAuthListener.asObservable();
  }

  // Check if the email exists in the database
  checkEmail(email: string){
    return new Observable<boolean>(observer => {
      this.httpClient.get(this.endpointURL + 'login/' + email).subscribe({
        next: (data: any) => {
          observer.next(data.exist);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
          observer.complete();
        }
      });
    });
  }


  signupUser(user: any){
    // Create the user object to send to the server
    const registerUser = {
      email: user.email,
      password: user.password,
      first_name: user.firstName,
      last_name: user.lastName,
      phone_number: user.phone,
      role_names: ['user']
    }

    return new Observable<boolean>(observer => {
      this.httpClient.post(this.endpointURL + 'signup', registerUser).subscribe({
        next: (data: any) => {
          observer.next(true);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
          observer.complete();
        }
      });
    });
  }

  // Login the user
  loginUser(email: string, password: string){
    // Create the user object to send to the server X-WWW-FORM-URLENCODED
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new URLSearchParams();
    body.set('username', email);
    body.set('password', password);
    body.set('grant_type', 'password');

    return new Observable<boolean>(observer => {
      this.httpClient.post(this.endpointURL + 'login', body, {headers}).subscribe({
        next: (data: any) => {
          // Save the token in the local storage
          localStorage.setItem('access_token', data.access_token);

          // Save the token in the service
          this.accessToken = data.access_token;

          // Set the authentication to true and notify the listeners
          this.isAuthenticated = true;
          this.statusAuthListener.next(true);

          observer.next(true);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
          observer.complete();
        }
      });
    });
  }

  

  // logout user
  logoutUser(){
    // reset the token and the authentication status
    this.accessToken = null;
    this.isAuthenticated = false;

    // notify the listeners
    this.statusAuthListener.next(false);

    // remove the token from the local storage
    localStorage.removeItem('access_token');

    // redirect the user to the home page
    this.router.navigate(['']);
  }

  // check if the user is authenticated
  
}
