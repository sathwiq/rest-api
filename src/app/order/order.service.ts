import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Order } from '../shared/order.model';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private order: Order[] = [];

  private orderUpdated = new Subject<Order[]>();
  constructor(private http: HttpClient) {}


  getOrderUpdateListener() {
    return this.orderUpdated.asObservable();
  }
  addOrder(orders: Order) {
    console.log(orders);
    this.http.post<{message: string}>('http://localhost:3000/orders', orders)
      .subscribe((resposeData) => {
        console.log(resposeData.message);
        this.order.push(orders);
        this.orderUpdated.next([...this.order]);
      });
    }

    getOrders() {
      this.http.get<{message: string , orders: Order[]}>('http://localhost:3000/orders')
      .subscribe((OrderData) => {
        this.order = OrderData.orders;
        this.orderUpdated.next([...this.order]);
      });
    }

}