import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import{ HttpClient} from '@angular/common/http';
import { Sponsors } from './shared/sponsors.model';
@Injectable({providedIn: 'root'})
export class SponsorService {
    private sponsors: Sponsors[] = [];
    private postsUpdated = new Subject<Sponsors[]>();
    constructor(private http: HttpClient){}

  addPost(title: string) {
    const sponsor: Sponsors = {title: title};
    this.http.post<{message:string}>('https://psat.herokuapp.com/posts',sponsor)
      .subscribe((resposeData)=>{
        console.log(resposeData.message);
        this.sponsors.push(sponsor);
        this.postsUpdated.next([...this.sponsors]);
      });

  }
  getPost(){
    this.http.get<{message:string ,posts:any}>('https://psat.herokuapp.com/posts')
    .subscribe((postData)=>{
      this.sponsors=postData.posts;
      this.postsUpdated.next([...this.sponsors])
    });
  }
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

}