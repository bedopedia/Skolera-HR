import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeGroupsRoutingModule } from './time-groups-routing.module';
import { TimeGroupsListComponent } from './time-groups-list/time-groups-list.component';
import { SharedModule } from '@shared/shared.module';
import { TimeGroupsSerivce } from '@skolera/services/time-groups.services';
import { RouterModule } from '@angular/router';
import { CreateEditTimeGroupComponent } from './create-edit-time-group/create-edit-time-group.component';
import {MatDialogModule} from '@angular/material/dialog';
import { EmployeesSerivce } from '@skolera/services/employees.services';

@NgModule({
  declarations: [
    TimeGroupsListComponent,
    CreateEditTimeGroupComponent
  ],
  imports: [
    CommonModule,
    TimeGroupsRoutingModule,
    SharedModule,
    RouterModule,
    MatDialogModule
  ],
  providers: [TimeGroupsSerivce,EmployeesSerivce],
  exports: [RouterModule]
  
})
export class TimeGroupsModule { }
