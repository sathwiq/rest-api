import { Component, OnInit} from '@angular/core';
import { PeriodicElement } from './items.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})

export class MenuItemComponent implements OnInit {
   ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', s: ''},
    {position: 2, name: 'Helium', s: ''},
    {position: 3, name: 'Lithium', s: ''},

  ];
  constructor(public  snackBar: MatSnackBar) {}

// tslint:disable-next-line: member-ordering
  displayedColumns: string[] = ['position', 'name', 's'];
// tslint:disable-next-line: no-use-before-declare

  dataSource = this.ELEMENT_DATA;  

  

  ngOnInit() {
    console.log(this.dataSource);
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}








