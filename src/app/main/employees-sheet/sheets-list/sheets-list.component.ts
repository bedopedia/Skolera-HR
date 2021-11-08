import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SheetFormComponent } from '../sheet-form/sheet-form.component';

@Component({
  selector: 'app-sheets-list',
  templateUrl: './sheets-list.component.html',
  styleUrls: ['./sheets-list.component.scss']
})
export class SheetsListComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }
 public uploadSheet(){
  const dialogRef = this.dialog.open(SheetFormComponent, {
    width: '650px',
    disableClose: true
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result == 'update'){
      
    }
  })
  }

}
