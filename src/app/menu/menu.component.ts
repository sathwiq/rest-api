import { Component, OnInit, NgModule } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Sponsors } from '../shared/sponsors.model';
import { RestaurantService } from './restaurant.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
@NgModule({
  providers:[MatSnackBar]
})
export class MenuComponent implements OnInit {
  sponsor:Sponsors[]=[];
  isOpen;
  private postsSub: Subscription;
  constructor(private sponserService:RestaurantService,
    private router: Router,private route: ActivatedRoute) { }
  ngOnInit() {
    this.sponserService.getCname();
    this.postsSub = this.sponserService.getCnameUpdateListener()
    .subscribe((posts: Sponsors[]) => {
      this.sponsor = posts;
    });
  }
  loadItems(a:string) {
    this.router.navigate(['items/'+a], {relativeTo: this.route});
  }
  openGroup(a: number){
    this.isOpen=a;
  }

}
