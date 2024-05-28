import { AuthenticateService } from './../authenticate/authenticate.service';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  endpointURL = environment.api + 'orders';

  constructor(private authService:AuthenticateService, private httpClient:HttpClient) { }

create(order : any){
  // Create the order object to send to the server
  const newOrder = {
    cart: order.cart,
    payment: order.payment,
    nb_people: order.nbPeople,
  };

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authService.getToken
  });


  return new Observable<boolean>(observer => {
    this.httpClient.post(this.endpointURL, newOrder, {headers}).subscribe({
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
