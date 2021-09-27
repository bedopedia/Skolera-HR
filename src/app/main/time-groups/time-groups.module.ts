import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeGroupsRoutingModule } from './time-groups-routing.module';
import { TimeGroupsListComponent } from './time-groups-list/time-groups-list.component';
import { SharedModule } from '@shared/shared.module';
import { TimeGroupsSerivce } from '@skolera/services/time-groups.services';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    TimeGroupsListComponent
  ],
  imports: [
    CommonModule,
    TimeGroupsRoutingModule,
    SharedModule,
    RouterModule
  ],
  providers: [TimeGroupsSerivce],
  exports: [RouterModule]
  
})
export class TimeGroupsModule { }
