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
  isFileUploading: boolean = false;
  nationalHolidayDate: any;
  sheetFile: any;
  sheet: AttendanceSheet = new AttendanceSheet();
  constructor(
    public dialogRef: MatDialogRef<SheetsListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appNotificationService: AppNotificationService,
    public translate: TranslateService,
    private employeesSerivce: EmployeesSerivce,
    private uploadFilesWithPreSignedUrlService: UploadFilesWithPreSignedUrlService

  ) { }

  ngOnInit(): void {

  }

  public closeModal() {
    this.dialogRef.close();
  }
  validateNationalHolidays(holidayDate: Date) {
    return this.sheet.national_holidays.filter(nationalDay => nationalDay.day.toString() == holidayDate.toString()).length > 0
  }
  addHoliday(holidayDate: any) {
    holidayDate = moment(holidayDate).format('YYYY-MM-DD');
    this.nationalHolidayDate = ''
    if (this.validateNationalHolidays(holidayDate)) {
      return
    }
    else {
      this.sheet.national_holidays.push(
        { day: holidayDate }
      )
    }

  }
  removeHoliday(holiday: any) {
    this.sheet.national_holidays = this.sheet.national_holidays.filter(nationalDay => nationalDay.day != holiday.day)
  }
  deleteUploadedFile(file: any) {
    this.sheetFile = null;
  }
  fileInputChange(event: any) {
    this.isFileUpdating = true;
    this.isFileHasError = false;
    this.isFileLoading = true;
    this.sheetFile = event.target.files[0];
    const params = {
      name: this.sheetFile.name,
      fileable_type: 'EmployeesAttendance',
      public_url: ''
    }
    this.subscriptions.push(this.uploadFilesWithPreSignedUrlService.getPreSignedUrl({
      presigned_url: {
        model_name: 'EmployeesAttendance',
        file_name: this.sheetFile.name
      }
    }).subscribe((presignedUrlResponse: any) => {
      params.public_url = presignedUrlResponse.public_url;
      this.sheet.uploaded_file_attributes = params;
      this.sheet.national_holidays_attributes = this.sheet.national_holidays
      this.subscriptions.push(this.uploadFilesWithPreSignedUrlService.putFileToS3(this.sheetFile, presignedUrlResponse.presigned_url).subscribe(
        (s3Response: any) => {
          this.isFileUpdating = false;
          this.isFileLoading = false;
          this.isFileSuccess = true;
        }, error => {
          this.isFileHasError = true;
          this.isFileLoading = false;
          this.isFileUpdating = false;
        }))
    }, error => {
      this.isFileHasError = true;
      this.isFileLoading = false;
      this.isFileUpdating = false;
    }
    ))
  }

  resetNationalHolidays() {
    this.sheet.national_holidays = [];
    this.nationalHolidayDate = '';
  }

  submitForm() {
    if (this.sheetFile == null || !this.sheet.start_date || !this.sheet.end_date) {
      return
    }
    this.isFileUploading = true;
    delete this.sheet.state;
    delete this.sheet.uploaded_file
    this.sheet.start_date = moment(this.sheet.start_date).format('YYYY-MM-DD')
    this.sheet.end_date = moment(this.sheet.end_date).format('YYYY-MM-DD')
    this.sheet.national_holidays_attributes = this.sheet.national_holidays;
    const params = {
      employees_attendance: this.sheet
    }
    this.employeesSerivce.createAttendanceSheet(params).subscribe(response => {
      this.appNotificationService.push(this.translate.instant('tr_attendance_sheet_created_successfully'), 'success');
      this.dialogRef.close('update');
      this.isFileUploading = false;
    }, error => {
      this.isFileUploading = false;
      this.appNotificationService.push(this.translate.instant('tr_something_went_wrong'), 'error');
    })
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s && s.unsubscribe())
  }
}