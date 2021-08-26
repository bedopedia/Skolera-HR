import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeGroupsRoutingModule } from './time-groups-routing.module';
import { TimeGroupsComponent } from './time-groups/time-groups.component';

@NgModule({
  declarations: [TimeGroupsComponent],
  imports: [
    CommonModule,
    TimeGroupsRoutingModule
  ]
})
export class TimeGroupsModule { }
