import { Component } from '@angular/core';
import { OrderService } from '../../services/order/order.service';
import { OrderComponent } from "../../components/order/order.component";
import { Order } from '../../models/order.model';
import { CommonModule } from '@angular/common';
import { AuthenticateService } from '../../services/authenticate/authenticate.service';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal/modal.service';
import { OrdersDateComponent } from '../../components/orders-date/orders-date.component';
import { ConstantsInfo } from '../../constantsInfo';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, OrderComponent, OrdersDateComponent],
  templateUrl: './admin-orders.component.html',
  styleUrl: '/src/scss/pages/admin-orders.scss'
})
export class AdminOrdersComponent {
  ordersArray: Order[] = [];
  countOrders: number = 0;

  limit = ConstantsInfo.LIMIT_DISPLAY_ORDERS;
  listRanges = [{ start: 1, end: this.countOrders }];
  ordersSelected = 1;

  datesArray: string[] = [];

  showLatest = true;
  showByDate = false;

  constructor(private ordersService: OrderService, private authService: AuthenticateService, private router: Router, protected modalService: ModalService) { }

  ngOnInit(): void {
    // If the user is authenticated, we get the orders
    if (this.authService.getIsAuthenticated) {
      // Get the list of dates
      let today = new Date();

      for (let i = 0; i < 5; i++) {
        let date = new Date(today);
        date.setDate(date.getDate() - i);
        this.datesArray.push(date.toISOString().split('T')[0]);
      }

      this.ordersService.getOrdersUser().subscribe({
        next: (data) => {
          this.countOrders = data.count;
          this.ordersArray = data.orders;

          this.listRanges = this.setOrdersRange(this.countOrders, this.limit);
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

  toggleLatest() {
    this.showLatest = true;
    this.showByDate = false;
  }

  toggleByDate() {
    this.showLatest = false;
    this.showByDate = true;
  }

  setOrdersRange(count: number, limit: number) {
    let nbRanges = Math.floor(count / limit);
    let listRanges = [];

    for (let i = 0; i < nbRanges; i++) {
      listRanges.push({ start: 1 + i * limit, end: (i + 1) * limit });
    }

    if (count % limit != 0) {
      listRanges.push({ start: 1 + nbRanges * limit, end: count });
    }

    return listRanges;
  }

  changeOrders(start: number) {
    this.ordersSelected = start;
    this.ordersService.getOrdersUser(start).subscribe({
      next: (data) => {
        this.countOrders = data.count;
        this.ordersArray = data.orders;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
