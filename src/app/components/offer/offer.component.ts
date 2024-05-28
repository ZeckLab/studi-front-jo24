import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Offer, OfferInCart } from '../../models/offer.model';
import { ShoppingCartItem } from '../../models/shoppingCartItem.model';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrl: '/src/scss/components/offer.scss'
})

export class OfferComponent {

  @Input() offer: Offer = new Offer();
  @Input() quantity: number = 1;
  @Output() choiceEvent = new EventEmitter<ShoppingCartItem>();
  

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
    this.choiceEvent.emit(new ShoppingCartItem(new OfferInCart(this.offer), this.quantity));
    this.quantity = 1;
  }

  scroll(){
    document.getElementById("shoppingcart")?.scrollIntoView({behavior: "smooth"});
  }
}
