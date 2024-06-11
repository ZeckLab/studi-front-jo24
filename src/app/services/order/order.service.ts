import { AuthenticateService } from './../authenticate/authenticate.service';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../../models/order.model';
import { ConstantsInfo } from '../../constantsInfo';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  limit = ConstantsInfo.LIMIT_DISPLAY_ORDERS;
  endpointURL = environment.api + 'orders';

  constructor(private authService: AuthenticateService, private httpClient: HttpClient) { }

  create(order: any) {
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
      this.httpClient.post(this.endpointURL, newOrder, { headers }).subscribe({
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

  // Get the orders of the user connected
  getOrdersUser(start: number = 1) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getToken
    });

    let skip = (start - 1);
    let query = "?skip=" + skip + "&limit=" + this.limit;

    return new Observable<any>(observer => {
      this.httpClient.get(this.endpointURL + query, { headers }).subscribe({
        next: (data: any) => {
          const orders = [];

          for(const jsonOrder of data.orders){
            const order = new Order();
            order.loadfromJson(jsonOrder);
            orders.push(order);
          }

          observer.next({count:data.count, orders:orders});
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
          observer.complete();
        }
      });
    });
  }

  // Get the orders by date
  getOrdersByDate(dateOrders: string, start: number = 1) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getToken
    });

    let skip = (start - 1);
    let query = "?skip=" + skip + "&limit=" + this.limit;

    return new Observable<any>(observer => {
      this.httpClient.get(this.endpointURL + "/date/" + dateOrders + query, { headers }).subscribe({
        next: (data: any) => {
          const orders = [];
          let mountOrders = 0.0;
          let placeOrders = 0;

          for(const jsonOrder of data.orders){
            const order = new Order();
            order.loadfromJson(jsonOrder);
            mountOrders += order.mount;
            placeOrders += order.places;
            orders.push(order);
          }

          observer.next({count:data.count, mount:mountOrders, places:placeOrders, orders:orders});
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
          observer.complete();
        }
      });
    });
  }

  // Get the details of an order by its name
  getDetails(name: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getToken
    });

    return new Observable<any>(observer => {
      this.httpClient.get(this.endpointURL + '/' + name + "/details", { headers }).subscribe({
        next: (data: any) => {
          observer.next(data);
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
