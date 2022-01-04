import { Component, OnInit } from '@angular/core';
import { EmployeesSerivce } from '@skolera/services/employees.services';
import { PaginationData } from '@core/models/skolera-interfaces.model'
import { Department, Employee } from '@core/models/employees-interface.model'
import { Subscription } from 'rxjs';

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
  currentOrder: any = {
    number: '',
    name: '',
    department: '',
    biometric_id: ''
  }
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
  searchTimeout: any;

  private subscriptions: Subscription[] = [];

  constructor(
    private employeesService: EmployeesSerivce
  ) { }

  ngOnInit(): void {
    this.getEmployees();
    this.getDepartments();
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
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      term = (searchKey == 'by_department_id') ? term : term.target.value
      this.params[searchKey] = term;
      this.params.page = 1;
      this.getEmployees();
    }, 500);
  }
  paginationUpdate(page: number) {
    this.params.page = page;
    this.getEmployees();
  }
  onOrder(event: string, orderType: string) {
    if (event == 'not-me') {return}
    this.resetCurrentOrder();
    this.currentOrder[orderType] = event;
    delete this.params.order_by_name;
    delete this.params.order_by_number;
    delete this.params.order_by_department;
    delete this.params.order_biometric_id;
    orderType = 'order_by_' + orderType;
    this.params[orderType] = event == "ascending" ? 'asc' : 'desc';
    this.params.page = 1;
    this.getEmployees();
  }

  resetCurrentOrder(){
    this.currentOrder = {
      number: '',
      name: '',
      department: '',
      biometric_id: ''
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s && s.unsubscribe())
  }

}

