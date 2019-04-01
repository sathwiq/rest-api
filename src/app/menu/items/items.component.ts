import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { Restaurant } from 'src/app/shared/restaurant.model';
import { RestaurantService } from '../restaurant.service';
import { CartService } from 'src/app/cart/cart.service';
import { Cart } from 'src/app/shared/cart.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  constructor(public  snackBar: MatSnackBar,
    private route: ActivatedRoute,
              public itemService: RestaurantService,
              public cartService: CartService) {}
  item: Restaurant['items'][] = [];
  loaded = false;
  dataSource;
  private itemsSub: Subscription;
  loadedItem;

// tslint:disable-next-line: member-ordering
  displayedColumns: string[] = ['position', 'name', 'price', 's'];

  cart: Cart;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loadedItem= params.a;
      this.itemService.getItems(this.loadedItem);
      this.itemsSub = this.itemService.getItemUpdateListener()
      .subscribe((items: Restaurant['items'][] ) => {
        this.item = items;
        this.dataSource = this.item;
        this.loaded = true;
        
  });

    });
  }

  openSnackBar(message: string, action: string , i: number) {
    this.cart = {title: this.dataSource[i].name, price: this.dataSource[i].price,no : 0};
    this.cartService.addTOCart(this.cart);
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }
}
