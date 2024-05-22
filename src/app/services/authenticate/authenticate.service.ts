import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  endpointURL = environment.api;

  constructor(private httpClient: HttpClient) {
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
    console.log("Nous sommes dans le login user");

    return new Observable<boolean>(observer => {
      this.httpClient.post(this.endpointURL + 'login', body, {headers}).subscribe({
        next: (data: any) => {
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('expires_delta', data.refresh_token);
          console.log(data);
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
}
