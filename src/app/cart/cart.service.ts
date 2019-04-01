import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';
import { Cart } from '../shared/cart.model';
@Injectable({
  providedIn: 'root'
})

export class CartService {
  private carts: Cart[] = [
      {title:'s',price:3,no : 2}
  ];
  cartsChanged = new Subject<Cart[]>();
  constructor(private http: HttpClient) {}

  getcarts() {
    return this.carts.slice();
  }
  addTOCart(cart: Cart) {
    this.carts.push(cart);
    this.cartsChanged.next(this.carts.slice());
  }

  addToCart(carts: Cart[]) {
    this.carts.push(...this.carts);
    this.cartsChanged.next(this.carts.slice());
  }
}
