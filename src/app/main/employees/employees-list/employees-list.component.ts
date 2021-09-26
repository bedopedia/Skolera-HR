import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EmployeesSerivce } from '@skolera/services/employees.services';
import { Employee, PaginationData } from '@core/models/skolera-interfaces.model'

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
  departments= ['System Admin','ggggg'];
  selectedDepartment: string;
  employeesList: Employee[];
  fullscreenEnabled = false;
  params: any = {
    page: 1,
    per_page: this.paginationPerPage,
  };
  paginationData: PaginationData

  constructor(
    private employeesService: EmployeesSerivce,
  ) { }

  ngOnInit(): void {
    this.getEmployees();
    this.getDepartments();
  }
  getEmployees() {
    this.employeesService.getEmployees(this.params).subscribe((response: any) => {
      this.employeesList = response.employees
      this.paginationData = response.meta;
      this.employeesLoading = false
    })
  }
  getDepartments(){
    this.employeesService.getDepartments().subscribe((response: any) => {
    })
  }
  filterEmployees(term: any, serchKey: string) {
    term = (serchKey == 'by_department_name') ? term : term.target.value
    if (term.trim() === serchKey) {
      delete this.params[serchKey];
    }
    else {
      this.params[serchKey] = term;
    }
    this.getEmployees();
  }
  paginationUpdate(page: number) {
    this.params.page = page;
    this.getEmployees();
  }

}

