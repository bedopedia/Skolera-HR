import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeGroupsRoutingModule } from './time-groups-routing.module';
import { TimeGroupsListComponent } from './time-groups-list/time-groups-list.component';
import { SharedModule } from '@shared/shared.module';
import { TimeGroupsSerivce } from '@skolera/services/time-groups.services';
import { RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import { EmployeesSerivce } from '@skolera/services/employees.services';
import { TimeScheduleComponent } from './time-schedule/time-schedule.component';
import { EditTimeGroupComponent } from './edit-time-group/edit-time-group.component';
import { CreateTimeGroupComponent } from './create-time-group/create-time-group.component';
import { TimeScheduleFormComponent } from './time-schedule-form/time-schedule-form.component';

@NgModule({
  declarations: [
    TimeGroupsListComponent,
    TimeScheduleComponent,
    EditTimeGroupComponent,
    CreateTimeGroupComponent,
    TimeScheduleFormComponent
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
