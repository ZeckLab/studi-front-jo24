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

  @Input() item!: ShoppingCartItem;
  @Output() removeItemClicked = new EventEmitter();

  increaseQuantity() {
    this.item.quantity++;
    this.item.addItemQtyStorage(1);
  }

  decreaseQuantity() {
    this.item.quantity--;
    this.item.removeItemQtyStorage(1);
  }

  removeItem() {
    this.removeItemClicked.emit();
  }
  
}
