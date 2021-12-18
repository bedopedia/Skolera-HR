import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeesSerivce } from '@skolera/services/employees.services';
import { SharedModule } from '@shared/shared.module';
import { FedenaSyncService } from '@skolera/services/fedena-sync-service.service';
import { FedenaSyncComponent } from './fedena-sync/fedena-sync.component';


@NgModule({
  declarations: [
    EmployeesListComponent,
    FedenaSyncComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    SharedModule
  ],
  providers: [EmployeesSerivce,FedenaSyncService]
})
export class EmployeesModule { }
