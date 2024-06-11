import { OrderService } from './../../services/order/order.service';
import { Component, Input } from '@angular/core';
import { OrderComponent } from '../order/order.component';
import { CommonModule } from '@angular/common';
import { ConstantsInfo } from '../../constantsInfo';

@Component({
  selector: 'app-orders-date',
  standalone: true,
  imports: [OrderComponent, CommonModule],
  templateUrl: './orders-date.component.html',
  styleUrl: '/src/scss/components/orders-date.scss'
})
export class OrdersDateComponent {
  isUser = false; // This is a boolean value to display the order component in format dashboard for the admin

  @Input() dateOrders: string = '';
  dateOrderDisplay = new Date(this.dateOrders).toString();
  countOrders: number = 0;
  
  limit = ConstantsInfo.LIMIT_DISPLAY_ORDERS;
  listRanges = [{ start: 1, end: this.countOrders}];
  ordersSelected = 1;

  mountOrders: number = 0.0;
  placesOrders: number = 0;
  showDetails = false;

  ordersArray = [];

  constructor(private orderService: OrderService) { }

  ngAfterViewInit(): void {
    this.orderService.getOrdersByDate(this.dateOrders).subscribe({
      next: (data) => {
        this.countOrders = data.count;
        this.listRanges = this.setOrdersRange(this.countOrders, this.limit);

        this.mountOrders = data.mount;
        this.placesOrders = data.places;
        this.ordersArray = data.orders;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  setOrdersRange(count: number, limit: number){
    let nbRanges = Math.floor(count / limit);
    let listRanges = [];
    
    for(let i = 0; i < nbRanges; i ++){
      listRanges.push({ start: 1 + i*limit, end: (i+1)*limit });
    }

    listRanges.push({ start: 1 + nbRanges*limit, end: count });

    return listRanges;
  }

  changeOrders(start: number){
    this.ordersSelected = start;
    this.orderService.getOrdersByDate(this.dateOrders, start).subscribe({
      next: (data) => {
        this.countOrders = data.count;
        this.mountOrders = data.mount;
        this.placesOrders = data.places;
        this.ordersArray = data.orders;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
