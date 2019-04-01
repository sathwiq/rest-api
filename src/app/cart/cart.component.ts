import { Component, OnInit } from '@angular/core';
import { Cart } from '../shared/cart.model';
import { Subscription } from 'rxjs';
import { CartService } from './cart.service';
import { MatSnackBar } from '@angular/material';
import { OrderService } from '../order/order.service';
import { Order } from '../shared/order.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  Carts: Cart[];
  order: Order;
  items: Order['items'];
  private subscription: Subscription;

  constructor(private cService: CartService,
              private oService: OrderService,
              public  snackBar: MatSnackBar) { }

  ngOnInit() {
    this.Carts = this.cService.getcarts();
    this.subscription = this.cService.cartsChanged
      .subscribe(
        (Carts: Cart[]) => {

          this.Carts = Carts;
          console.log(this.Carts);
        }
      );
  }

  openSnackBar(message: string, action: string ) {
    const orders: Order = {status: 'ok',
                 items: [this.Carts[0]],
                 userId: 1, tNo: 2 ,
                 _id: null,
                 totalPrice: this.Carts[0].price * this.Carts[0].no};
    for (let index = 1; index < this.Carts.length; index++) {
                  orders.items.push(this.Carts[index]);
                  orders.totalPrice += this.Carts[index].price * this.Carts[index].no;
                 }
    console.log(orders);
    console.log(this.Carts);
    this.oService.addOrder(orders);
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  add(i) {
    this.Carts[i].no++;
  }
  sub(i) {
    this.Carts[i].no--;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
