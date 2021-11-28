import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeesSerivce } from '@skolera/services/employees.services';
import { SharedModule } from '@shared/shared.module';
import { FedenaSyncService } from '@skolera/services/fedenaSyncService.service';


@NgModule({
  declarations: [
    EmployeesListComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    SharedModule
  ],
  providers: [EmployeesSerivce,FedenaSyncService]
})
export class EmployeesModule { }
