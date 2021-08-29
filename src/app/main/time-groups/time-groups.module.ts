import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeGroupsRoutingModule } from './time-groups-routing.module';
import { TimeGroupsListComponent } from './time-groups-list/time-groups-list.component';

@NgModule({
  declarations: [TimeGroupsListComponent],
  imports: [
    CommonModule,
    TimeGroupsRoutingModule
  ]
})
export class TimeGroupsModule { }
