import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Offer } from '../../models/offer.model';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrl: '/src/scss/components/offer.scss'
})

export class OfferComponent {

  @Input() offer: Offer = new Offer();
  @Input() quantity: number = 1;
  @Output() choiceEvent = new EventEmitter<string>();
  

  changeOffer(valueStr: string) {
    if (valueStr !== null) {
      console.log(valueStr);
      this.quantity = parseInt(valueStr, 10);
    }
  }

  downOffer() {
    if(this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  upOffer() {
    this.quantity += 1;
  }

  choiceOffer() {
    this.choiceEvent.emit(this.offer.title + " - " + this.quantity + " x " + this.offer.price + " € = " + this.quantity * this.offer.price + " €");
    this.quantity = 1;
  }

}
