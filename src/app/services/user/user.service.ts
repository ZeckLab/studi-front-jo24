import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticateService } from '../authenticate/authenticate.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserProfile } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpointURL = environment.api + 'users';

  constructor(private httpClient: HttpClient, private authService:AuthenticateService) {}

  // Get informations about the user connected
  getProfile() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getToken
    });

    return new Observable<UserProfile>(observer => {
      this.httpClient.get(this.endpointURL + '/me', { headers }).subscribe({
        next: (data: any) => {
          const user = new UserProfile();
          user.loadfromJson(data);

          observer.next(user);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
          observer.complete();
        }
      });
    });
  }

  // Update user informations
  updateProfile(user: UserProfile) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getToken
    });

    return new Observable<UserProfile>(observer => {
      this.httpClient.put(this.endpointURL + '/me', user, { headers }).subscribe({
        next: (data: any) => {
          const user = new UserProfile();
          user.loadfromJson(data);

          observer.next(user);
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
