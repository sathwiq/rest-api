import {
  Injectable
} from '@angular/core';
import {
  Subject
} from 'rxjs';
import {
  map
} from 'rxjs/operators';
import {
  HttpClient
} from '@angular/common/http';
import {
  Restaurant
} from '../shared/restaurant.model';
import { Sponsors } from '../shared/sponsors.model';
@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private item: Restaurant['items'][] = [];

  private itemUpdated = new Subject < Restaurant['items'][] > ();
  private cname: Sponsors[] = [];
  private cnamesUpdated = new Subject<Sponsors[]>();
  constructor(private http: HttpClient) {}
  getItems(s:string) {
    this.item.pop();
    this.http.get < {
        message: string,
        items: Restaurant['items'][]
      } > ('https://psat.herokuapp.com/items/'+s)
      .subscribe((restaurantData) => {
        this.item = restaurantData.items;
        this.itemUpdated.next([...this.item]);
      });
  }
  getItemUpdateListener() {
    return this.itemUpdated.asObservable();
  }
  getCname(){
    this.http.get<{message:string ,posts:any}>('https://psat.herokuapp.com/cname')
    .subscribe((cnameData)=>{
      this.cname=cnameData.posts;
      this.cnamesUpdated.next([...this.cname]);
    });
  }
  getCnameUpdateListener() {
    return this.cnamesUpdated.asObservable();
  }
}