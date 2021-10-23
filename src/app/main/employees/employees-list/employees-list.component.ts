import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EmployeesSerivce } from '@skolera/services/employees.services';
import { Department, Employee, PaginationData } from '@core/models/skolera-interfaces.model'

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

  constructor(
    private employeesService: EmployeesSerivce,
  ) { }

  ngOnInit(): void {
    this.getEmployees();
    this.getDepartments();
  }
  getEmployees() {
    this.employeesLoading = true;
    this.employeesService.getEmployees(this.params).subscribe((response: any) => {
      this.employeesList = response.employees
      this.paginationData = response.meta;
      this.employeesLoading = false
    })
  }
  getDepartments() {
    this.departmentsLoading = true
    this.employeesService.getDepartments(this.dePartmentsParams).subscribe((response: any) => {
      this.departmentsPagination = response.meta;
      this.departments = this.departments.concat(response.employee_departments);
      this.departmentsLoading = false
    })
  }
  nextBatch() {
    if (this.departmentsPagination.next_page) {
      this.departmentsLoading = true;
      this.dePartmentsParams.page = this.departmentsPagination.next_page;
      this.getDepartments();
    }
  }

  filterEmployees(term: any, serchKey: string) {
    term = (serchKey == 'by_department_id') ? term : term.target.value
    this.params[serchKey] = term;
    this.getEmployees();
  }
  paginationUpdate(page: number) {
    this.params.page = page;
    this.getEmployees();
  }

}

