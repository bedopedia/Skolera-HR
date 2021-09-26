import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeesSerivce } from '@skolera/services/employees.services';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    EmployeesListComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    SharedModule
  ],
  providers: [EmployeesSerivce]
})
export class EmployeesModule { }
