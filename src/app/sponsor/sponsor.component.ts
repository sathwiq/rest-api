import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SponsorService } from '../sponsors.service';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.css']
})
export class SponsorComponent implements OnInit {
  constructor(public sponsorsService: SponsorService) {}
  
  ngOnInit() {
  }
  onAddSponsor(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.sponsorsService.addPost(form.value.title);
    form.resetForm();
  }

}
