import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  endpointURL = environment.api;

  constructor(private httpClient: HttpClient) {
  }

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
}
