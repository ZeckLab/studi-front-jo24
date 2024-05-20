import { Component, OnInit } from '@angular/core';
import { EventM } from '../../models/eventM.model';
import { EventsService } from '../../services/events/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: '/src/scss/pages/home.scss'
})

export class HomeComponent implements OnInit{

  eventsArray: EventM[] = [];

  constructor(private eventsService: EventsService) {
  }

  ngOnInit(): void {
    this.eventsService.getAllVisible().subscribe({
      next: (events: EventM[]) => {
        this.eventsArray = events;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}