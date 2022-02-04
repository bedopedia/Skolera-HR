import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AttendanceSheet } from '@core/models/attendance-sheets-interface.model';
import { PaginationData } from '@core/models/skolera-interfaces.model';
import { TranslateService } from '@ngx-translate/core';
import { AppNotificationService } from '@skolera/services/app-notification.service';
import { EmployeesSerivce } from '@skolera/services/employees.services';
import { FedenaSyncService } from '@skolera/services/fedena-sync-service.service';
import { SheetFormComponent } from '../sheet-form/sheet-form.component';

@Component({
  selector: 'app-sheets-list',
  templateUrl: './sheets-list.component.html',
  styleUrls: ['./sheets-list.component.scss']
})
export class SheetsListComponent implements OnInit {
  paginationPerPage: number = 10
  isNotAuthorized: boolean = false;
  params: any = {
    page: 1,
    per_page: this.paginationPerPage,
  };
  paginationData: PaginationData;
  sheetsLoading: boolean = true;
  sheets: AttendanceSheet[] = [];
  isSyncing:boolean = false;
  constructor(
    private dialog: MatDialog,
    private employeesSerivce: EmployeesSerivce,
    private appNotificationService: AppNotificationService,
    private fedenaSyncService: FedenaSyncService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.getSheets();
  }

  getSheets() {
    this.sheetsLoading = true;
    this.employeesSerivce.getEmployeeAttendance(this.params).subscribe((response: any) => {
      this.sheets = response.employees_attendnaces.map((attendance: any) => { attendance.logs = JSON.parse(attendance.logs); return attendance; })
      this.paginationData = response.meta;
      this.sheetsLoading = false;
    }, error => {
        if(error.status == 403) {
          this.isNotAuthorized = true;
        }
        else {
          this.sheetsLoading = false;
          this.appNotificationService.push(this.translateService.instant('tr_unexpected_error_message'), 'error');
        }
   
    })
  }
  paginationUpdate(page: number) {
    this.params.page = page;
    this.getSheets();
  }
  public uploadSheet() {
    const dialogRef = this.dialog.open(SheetFormComponent, {
      width: '650px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'update') {
        this.getSheets();
      }
    })
  }

  public startSync(sheet: AttendanceSheet) {
    this.isSyncing = true;
    this.fedenaSyncService.syncAttendanceSheet({ employees_attendance_id: sheet.id }).subscribe(response => {
      this.isSyncing = false;
      sheet.state = "syncing"
      this.appNotificationService.push(this.translateService.instant('tr_hr_sync_started'), 'success')
    }, error => {
      this.isSyncing = false;
      if (error.error && error.error.message) {
        this.appNotificationService.push(error.error.message, 'error');
      } else {
        this.appNotificationService.push(this.translateService.instant('tr_unexpected_error_message'), 'error');
      }
    })
  }
}
