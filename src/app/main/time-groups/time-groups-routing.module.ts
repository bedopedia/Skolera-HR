import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEditTimeGroupComponent } from './create-edit-time-group/create-edit-time-group.component';
import { TimeGroupsListComponent } from './time-groups-list/time-groups-list.component';

const routes: Routes = [
  {
    path: '', component: TimeGroupsListComponent
  },
  {
    path: 'create', component: CreateEditTimeGroupComponent
  },
  {
    path: ':id/edit', component: CreateEditTimeGroupComponent
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeGroupsRoutingModule { }
