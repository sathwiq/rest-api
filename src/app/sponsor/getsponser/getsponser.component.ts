import { Component, OnInit } from '@angular/core';
import { Sponsors } from 'src/app/shared/sponsors.model';
import { SponsorService } from 'src/app/sponsors.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-getsponser',
  templateUrl: './getsponser.component.html',
  styleUrls: ['./getsponser.component.css']
})
export class GetsponserComponent implements OnInit {
  sponsor:Sponsors[]=[];
  private postsSub: Subscription;
  constructor(private sponserService:SponsorService) { }
  ngOnInit() {
    this.sponserService.getPost();
    this.postsSub = this.sponserService.getPostUpdateListener()
    .subscribe((posts: Sponsors[]) => {
      this.sponsor = posts;
    });
  }
}
