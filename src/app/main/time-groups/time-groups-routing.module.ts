import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimeGroupsListComponent } from './time-groups-list/time-groups-list.component';

const routes: Routes = [
  {
      path: '', component: TimeGroupsListComponent
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeGroupsRoutingModule { }
