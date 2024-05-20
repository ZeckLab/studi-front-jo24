import { Component, OnInit } from '@angular/core';
import { Offer } from '../../models/offer.model';
import { OffersService } from '../../services/offers/offers.service';
import { ShoppingCartItem } from '../../models/shoppingCartItem.model';

@Component({
  selector: 'app-offers-page',
  templateUrl: './offers.component.html',
  styleUrl: '/src/scss/pages/offers-page.scss'
})

export class OffersPageComponent implements OnInit{

  offersArray: Offer[] = [];
  itemsArray: ShoppingCartItem[] = [];

  constructor(private offersService: OffersService) {
  }

  ngOnInit(): void {
    this.offersService.getAllVisible().subscribe({
      next: (offers: Offer[]) => {
        this.offersArray = offers;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  addChoice(choice: ShoppingCartItem) {
    let index = this.itemsArray.findIndex(item => item.offer.title === choice.offer.title);
    if(index !== -1) {
      // If the choice is already in the cart, increment its quantity
      this.itemsArray[index].quantity += choice.quantity;
    } else {
      this.itemsArray.push(choice);
    }
    console.log(this.itemsArray);
  }

  removeItem($event: ShoppingCartItem) {
    this.itemsArray = this.itemsArray.filter(i => i !== $event);
  }
}
