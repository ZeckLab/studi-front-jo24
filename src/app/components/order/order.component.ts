import { Component, Input } from '@angular/core';
import { Order } from '../../models/order.model';
import { ShoppingCartComponent } from "../shopping-cart/shopping-cart.component";
import { CommonModule } from '@angular/common';
import { TicketComponent } from '../ticket/ticket.component';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  templateUrl: './order.component.html',
  styleUrl: '/src/scss/components/order.scss',
  imports: [ShoppingCartComponent, CommonModule, TicketComponent]
})
export class OrderComponent {
  @Input() order: Order = new Order();
  @Input() isUser: boolean = true;
  showDetailsOrder: boolean = false;
  showTicketOrder: boolean = false;
  loadTicket = !this.isUser;

  constructor(private orderService: OrderService) { }

  showDetails() {

    if (!this.isUser && this.order.details.length == 0) {
      this.orderService.getDetails(this.order.name).subscribe({
        next: (data: any) => {
          this.order.ticket = data.ticket;
          console.log(data.ticket);
          console.log(this.order.ticket);
          this.order.details = data.details;
          this.loadTicket = !this.loadTicket;
          this.showDetailsOrder = !this.showDetailsOrder;
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
    else {
      this.loadTicket = !this.loadTicket;
      this.showDetailsOrder = !this.showDetailsOrder;
    }
  }
}
