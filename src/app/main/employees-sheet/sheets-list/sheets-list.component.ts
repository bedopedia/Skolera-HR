import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AttendanceSheet } from '@core/models/attendance-sheets-interface.model';
import { PaginationData } from '@core/models/skolera-interfaces.model';
import { EmployeesSerivce } from '@skolera/services/employees.services';
import { SheetFormComponent } from '../sheet-form/sheet-form.component';

@Component({
  selector: 'app-sheets-list',
  templateUrl: './sheets-list.component.html',
  styleUrls: ['./sheets-list.component.scss']
})
export class SheetsListComponent implements OnInit {
  paginationPerPage: number = 10
  params: any = {
    page: 1,
    per_page: this.paginationPerPage,
  };
  paginationData: PaginationData;
  sheetsLoading: boolean = true;
  sheets:AttendanceSheet[] = [];
  constructor(
    private dialog: MatDialog,
    private EmployeesSerivce: EmployeesSerivce
  ) { }

  ngOnInit(): void {
    this.getSheets()
  }

  getSheets(){
    this.sheetsLoading = true;
    this.EmployeesSerivce.getEmployeeAttendance(this.params).subscribe((response: any)=> {
      this.sheets = response.employees_attendnaces
      this.paginationData = response.meta;
      this.sheetsLoading = false;
      
    })
  }
  paginationUpdate(page: number) {
    this.params.page = page;
    this.getSheets();
  }
 public uploadSheet(){
  const dialogRef = this.dialog.open(SheetFormComponent, {
    width: '650px',
    disableClose: true
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result == 'update'){
      this.getSheets();
    }
  })
  }

}
