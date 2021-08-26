import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '@core/guards';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    // canActivateChild: [AuthenticationGuard],
    children: [
      {
        path: 'employees', loadChildren: './employees/employees.module#EmployeesModule',
      },
      {
        path: 'rules', loadChildren: './rules/rules.module#RulesModule',
      },
      {
        path: 'time-groups', loadChildren: './time-groups/time-groups.module#TimeGroupsModule',
      },

      {
        path: '', loadChildren: './employees/employees.module#EmployeesModule',
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
