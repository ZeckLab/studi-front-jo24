import { Component, Input, OnInit } from '@angular/core';
import { EventM } from '../../models/eventM.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: '/src/scss/components/event.scss'
})
export class EventComponent implements OnInit{

  @Input() event: EventM = new EventM();
  
  constructor() {
  }

  ngOnInit(): void {}

}
