import { Component } from '@angular/core';
import { OrderService } from '../../services/order/order.service';
import { OrderComponent } from "../../components/order/order.component";
import { Order } from '../../models/order.model';
import { CommonModule } from '@angular/common';
import { AuthenticateService } from '../../services/authenticate/authenticate.service';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  templateUrl: './orders.component.html',
  styleUrl: '/src/scss/pages/orders.scss',
  imports: [CommonModule, OrderComponent]
})
export class OrdersComponent {

  ordersArray: Order[] = [];

  constructor(private ordersService: OrderService, private authService: AuthenticateService, private router:Router, protected modalService: ModalService) { }

  ngOnInit(): void {
    // If the user is authenticated, we get the orders
    if (this.authService.getIsAuthenticated) {
      this.ordersService.getOrdersUser().subscribe({
        next:
          (orders: Order[]) => {
            this.ordersArray = orders;
          },
        error: (error) => {
          console.error(error);
        }
      });
    }
    // If the user is not authenticated, we redirect him to the login modal
    else {
      alert("You are not authenticated");
      this.router.navigate(['/']);
      this.modalService.open('login');
    }
  }
}
