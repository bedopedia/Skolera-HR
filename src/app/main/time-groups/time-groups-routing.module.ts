import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditTimeGroupComponent } from './edit-time-group/edit-time-group.component';
import { TimeGroupsListComponent } from './time-groups-list/time-groups-list.component';

const routes: Routes = [
  {
    path: '', component: TimeGroupsListComponent
  },
  {
    path: ':id/edit', component: EditTimeGroupComponent
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeGroupsRoutingModule { }
