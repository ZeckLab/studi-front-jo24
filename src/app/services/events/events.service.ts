import { Injectable } from '@angular/core';
import { environment } from '../../../environnements/environnement';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EventM } from '../../models/eventM.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  endpointURL = environment.api + 'events';

  constructor(private httpClient: HttpClient) {
  }

  getAll() {
    return new Observable<EventM[]>(observer => {
      this.httpClient.get(this.endpointURL).subscribe({
        next: (data: any) => {
          const events = [];
          for(const jsonEvent of data){
            const eventM = new EventM();
            eventM.loadfromJson(jsonEvent);
            events.push(eventM);
          }
          observer.next(events);
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

  getAllVisible() {
    return new Observable<EventM[]>(observer => {
      this.httpClient.get(this.endpointURL + "/visible").subscribe({
        next: (data: any) => {
          const events = [];
          for(const jsonEvent of data){
            const eventM = new EventM();
            eventM.loadfromJson(jsonEvent);
            events.push(eventM);
          }
          observer.next(events);
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
    return new Observable<EventM>(observer => {
      this.httpClient.get(this.endpointURL + '/' + id).subscribe({
        next: (data: any) => {
          const eventM = new EventM();
          eventM.loadfromJson(data);
          observer.next(eventM);
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
