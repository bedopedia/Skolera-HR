import { Component, OnInit } from '@angular/core';
import { EmployeesSerivce } from '@skolera/services/employees.services';
import { PaginationData } from '@core/models/skolera-interfaces.model'
import { Department, Employee } from '@core/models/employees-interface.model'
import { Subscription } from 'rxjs';
import { FedenaSyncService } from '@skolera/services/fedenaSyncService.service';
import { AppNotificationService } from '@skolera/services/app-notification.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  employeesLoading: boolean = true;
  isFilterOpen: boolean = false;
  paginationPerPage = 10;
  notAuthorized: boolean;
  departments: Department[] = [];
  selectedDepartment: string;
  employeesList: Employee[];
  departmentsLoading: boolean = false;
  fullscreenEnabled = false;
  searchTerm: string;
  currentOrder: string = ''
  params: any = {
    page: 1,
    per_page: this.paginationPerPage,
  };
  dePartmentsParams: any = {
    page: 1,
    per_page: 10,
  };
  paginationData: PaginationData
  departmentsPagination: PaginationData
  private subscriptions: Subscription[] = [];
  syncButtonText = "Sync";

  isSyncing = true;
  intervalTime = 0; 

  constructor(
    private employeesService: EmployeesSerivce,
    private fedenaSyncService: FedenaSyncService,
    private appNotificationService:AppNotificationService
  ) { }

  ngOnInit(): void {
    this.getEmployees();
    this.getDepartments();
    this.getSyncStatus(true);
  }
  getEmployees() {
    this.employeesLoading = true;
    this.subscriptions.push(this.employeesService.getEmployees(this.params).subscribe((response: any) => {
      this.employeesList = response.employees
      this.paginationData = response.meta;
      this.employeesLoading = false
    }))
  }
  getDepartments() {
    this.departmentsLoading = true
    this.subscriptions.push(this.employeesService.getDepartments(this.dePartmentsParams).subscribe((response: any) => {
      this.departmentsPagination = response.meta;
      this.departments = this.departments.concat(response.employee_departments);
      this.departmentsLoading = false
    }))
  }
  nextBatch() {
    if (this.departmentsPagination.next_page) {
      this.departmentsLoading = true;
      this.dePartmentsParams.page = this.departmentsPagination.next_page;
      this.getDepartments();
    }
  }

  filterEmployees(term: any, searchKey: string) {
    term = (searchKey == 'by_department_id') ? term : term.target.value
    this.params[searchKey] = term;
    this.getEmployees();
  }
  paginationUpdate(page: number) {
    this.params.page = page;
    this.getEmployees();
  }
  onOrder(event: string, orderType: string) {
    if (event == 'not-me') {return}
    this.currentOrder = event
    delete this.params.order_by_name;
    delete this.params.order_by_number;
    delete this.params.order_by_department;
    delete this.params.order_biometric_id;
    orderType = 'order_by_' + orderType;
    this.params[orderType] = event == "ascending" ? 'asc' : 'desc';
    this.getEmployees();
  }
  checkSyncStatus () {
    setTimeout(() => {
       this.getSyncStatus()
    }, this.intervalTime)
}
getSyncStatus(initialCheck: boolean = false) {
  this.fedenaSyncService.getSyncStatus().subscribe(
       (response: any) => {
           let syncStatus = response.status;
           this.isSyncing = syncStatus == 'started';
           if (syncStatus == 'succeeded' ){
               this.syncButtonText = "Sync";
               if (initialCheck == false)
                   this.appNotificationService.push("Sync successfully finished", 'success');
           }
           else if (syncStatus == 'failed' ){
               this.syncButtonText = "Sync";
               if (initialCheck == false)
                   this.appNotificationService.push("Sync failed", 'error');
           }
           else if (syncStatus == 'started' ){
               this.syncButtonText = "Syncing.."
               this.intervalTime = 1000*60*5; // 5 minutes
               this.checkSyncStatus();
           }
       },
       error => {
           this.isSyncing = false;
           this.appNotificationService.push(error.statusText, 'error');
       }); 
}
  syncFedena() {
    this.fedenaSyncService.sync().subscribe(
      (response: any) => {
        console.log("da5l");
        
          this.intervalTime = 1000*60*10; // 10 minutes Initial time
          this.isSyncing = true;
          this.syncButtonText = "Syncing.."
          this.appNotificationService.push('Sync started', 'success')
          this.checkSyncStatus();
      },
      error => {
          this.isSyncing = false;
          this.appNotificationService.push(error.error.message, 'error');
      }); 
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s && s.unsubscribe())
  }

}

