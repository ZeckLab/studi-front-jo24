import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Offer } from '../../models/offer.model';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  endpointURL = environment.api + 'offers';

  constructor(private httpClient: HttpClient) {
  }

  getAll() {
    return new Observable<Offer[]>(observer => {
      console.log(this.endpointURL);
      this.httpClient.get(this.endpointURL).subscribe({
        next: (data: any) => {
          const offers = [];
          for(const jsonOffer of data){
            const offer = new Offer();
            offer.loadfromJson(jsonOffer);
            offers.push(offer);
          }
          observer.next(offers);
          observer.complete();
        },
        error: error => {
        observer.error(error);
        observer.complete();
        }
      });
    });
  }

  getAllVisible() {
    return new Observable<Offer[]>(observer => {
      let visible_order_by = this.endpointURL + "/visible?c=nb_people&order=asc";
      this.httpClient.get(visible_order_by).subscribe({
        next: (data: any) => {
          const offers = [];

          for(const jsonOffer of data){
            const offer = new Offer();
            offer.loadfromJson(jsonOffer);
            offers.push(offer);
          }
          
          observer.next(offers);
          observer.complete();
        },
        error: error => {
        console.log(error);
        observer.error(error);
        observer.complete();
        }
      });
    });
  }

  get(id: number){
    return new Observable<Offer>(observer => {
      this.httpClient.get(this.endpointURL + '/' + id).subscribe({
        next: (data: any) => {
          const offer = new Offer();
          offer.loadfromJson(data);
          observer.next(offer);
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
