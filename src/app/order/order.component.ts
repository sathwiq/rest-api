import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from '../shared/order.model';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  order: Order[] = [];
  loaded = false;
  dataSource;
  private ordersSub: Subscription;
  constructor(public orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrders();
    this.ordersSub = this.orderService.getOrderUpdateListener()
    .subscribe((orders: Order[] ) => {
      this.order = orders;
      this.dataSource = this.order;
      this.loaded = true;
      console.log(this.dataSource);
    });
  }
  ngOnDestroy() {
    this.ordersSub.unsubscribe();
  }

}
