import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
   { path: '',
        component: MainComponent,
        // canActivateChild: [AuthenticationGuard],
        children: [
            // {
            //     path: 'home', loadChildren: './home/home.module#HomeModule', outlet: "appOutlet"
            // },
            {
                path: 'employees', loadChildren: './employees/employees.module#EmployeesModule'
            },
            {
                path: 'time-groups', loadChildren: './time-groups/time-groups.module#TimeGroupsModule'
            },
            {
                path: 'rules', loadChildren: './rules/rules.module#RulesModule'
            },
            {
                path: '**', loadChildren: './employees/employees.module#EmployeesModule'
            },
            
        ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
