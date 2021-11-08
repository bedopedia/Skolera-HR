import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AppNotificationService } from '@skolera/services/app-notification.service';
import { Subscription } from 'rxjs';
import { SheetsListComponent } from '../sheets-list/sheets-list.component';

@Component({
  selector: 'app-sheet-form',
  templateUrl: './sheet-form.component.html',
  styleUrls: ['./sheet-form.component.scss']
})
export class SheetFormComponent implements OnInit {
  @ViewChild('attendanceSheetForm') attendanceSheetForm: NgForm;
  private subscriptions: Subscription[] = [];
  holidays: any[] = []
  constructor(
    public dialogRef: MatDialogRef<SheetsListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appNotificationService: AppNotificationService,
    public translate: TranslateService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

  }
 
  public closeModal() {
    this.dialogRef.close();
  }
  addHoliday(holiday:any){

console.log(holiday);
this.holidays.push(holiday)
  }
  removeHoliday(holiday:any){

  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s && s.unsubscribe())
  }
} 