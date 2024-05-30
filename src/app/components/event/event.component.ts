import { Component, Input } from '@angular/core';
import { EventM } from '../../models/eventM.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: '/src/scss/components/event.scss'
})
export class EventComponent{

  @Input() event: EventM = new EventM();
  
  constructor() {
  }
}
