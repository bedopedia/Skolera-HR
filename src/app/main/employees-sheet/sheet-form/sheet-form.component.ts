import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttendanceSheet } from '@core/models/attendance-sheets-interface.model';
import { TranslateService } from '@ngx-translate/core';
import { AppNotificationService } from '@skolera/services/app-notification.service';
import { EmployeesSerivce } from '@skolera/services/employees.services';
import { UploadFilesWithPreSignedUrlService } from '@skolera/services/upload_files_with_presigned_Url.service';
import * as moment from 'moment';
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
  holidays: any[] = [];
  isFileLoading: boolean = false;
  isFileHasError: boolean = false;
  isFileSuccess: boolean = false;
  isFileUpdating: boolean = false;
  nationalHolidayDate: any;
  sheetFile: any;
  sheet: AttendanceSheet = new AttendanceSheet();
  constructor(
    public dialogRef: MatDialogRef<SheetsListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appNotificationService: AppNotificationService,
    public translate: TranslateService,
    private dialog: MatDialog,
    private employeesSerivce: EmployeesSerivce,
    private uploadFilesWithPreSignedUrlService: UploadFilesWithPreSignedUrlService

  ) { }

  ngOnInit(): void {
    //  this.sheet = new AttendanceSheet();

  }

  public closeModal() {
    this.dialogRef.close();
  }
  addHoliday(holidayDate: any) {
    holidayDate = moment(holidayDate).format('YYYY-MM-DD');
    this.nationalHolidayDate = ''
    if(this.sheet.national_holidays.filter(nationalDay=> nationalDay.day.toString() == holidayDate.toString() ).length > 0){
      return
    }
    else {
      this.sheet.national_holidays.push(
        {day: holidayDate}
      )
    }
 
  }
  removeHoliday(holiday: any) {
    this.sheet.national_holidays= this.sheet.national_holidays.filter(nationalDay=>nationalDay.day != holiday.day )
  }
  deleteUploadedFile(file:any){
    this.sheetFile = '';
  }
  fileInputChange(event: any) {
    this.isFileUpdating = true;
    this.sheetFile = event.target.files[0];
    let params = {
      name: this.sheetFile.name,
      fileable_type: 'EmployeesAttendance',
      public_url: ''
    }
    this.isFileLoading = true;
    this.uploadFilesWithPreSignedUrlService.getPreSignedUrl({
      presigned_url: {
        model_name: 'EmployeesAttendance',
        file_name: this.sheetFile.name
      }
    }).subscribe((presignedUrlResponse: any) => {
      params.public_url = presignedUrlResponse.public_url;
      this.sheet.uploaded_file_attributes = params;
      this.isFileUpdating = false;
      this.isFileLoading = false;
      this.isFileSuccess = true;
        this.uploadFilesWithPreSignedUrlService.putFileToS3(this.sheetFile, presignedUrlResponse.presigned_url).subscribe(
          (s3Response: any) => {
           
          })
      }, error => {
        this.isFileHasError = true;
      }
    )
  }

  submitForm() {
    delete  this.sheet.state;
    delete  this.sheet.uploaded_file
    let params = {
      employees_attendance: this.sheet
    }
    this.employeesSerivce.createAttendanceSheet(params).subscribe(response => {
      this.dialogRef.close('update');
    })
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s && s.unsubscribe())
  }
}