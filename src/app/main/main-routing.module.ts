import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '@core/guards';
import { MainComponent } from './main.component';

const routes: Routes = [
  { path: '',
       component: MainComponent,
       canActivateChild: [AuthenticationGuard],
       children: [
           {
               path: 'employees',
               loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule)
           },
          
           {
               path: '**',  loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule)
           },
           
       ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
