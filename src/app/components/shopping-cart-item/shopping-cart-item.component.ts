import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShoppingCartItem } from '../../models/shoppingCartItem.model';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart-item',
  standalone: true,
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './shopping-cart-item.component.html',
  styleUrl: '/src/scss/components/shopping-cart-item.scss'
})

export class ShoppingCartItemComponent {

  @Input() item: ShoppingCartItem = new ShoppingCartItem();
  @Output() removeItemClicked = new EventEmitter();

  increaseQuantity() {
    this.item.quantity++;
  }

  decreaseQuantity() {
    this.item.quantity--;
  }

  removeItem() {
    this.removeItemClicked.emit();
  }
  
}
