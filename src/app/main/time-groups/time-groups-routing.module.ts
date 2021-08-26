import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimeGroupsComponent } from './time-groups/time-groups.component';

const routes: Routes = [
  {
    path: '', component: TimeGroupsComponent
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeGroupsRoutingModule { }
