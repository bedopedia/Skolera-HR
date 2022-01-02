import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '@core/guards';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivateChild: [AuthenticationGuard],
    children: [
      {
        path: 'employees',
        loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'time-groups',
        loadChildren: () => import('./time-groups/time-groups.module').then(m => m.TimeGroupsModule)
      },
      {
        path: 'rules',
        loadChildren: () => import('./rules/rules.module').then(m => m.RulesModule)
      },
      {
        path: 'sheets',
        loadChildren: () => import('./employees-sheet/employees-sheet.module').then(m => m.EmployeesSheetModule)
      },

      {
        path: '**',  loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
