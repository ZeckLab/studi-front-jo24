import { Offer } from './offer.model';


export class ShoppingCartItem {
    offer!: Offer;
    quantity: number = 0;
}