import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SheetsListComponent } from './sheets-list/sheets-list.component';

const routes: Routes = [
  {
      path: '', component: SheetsListComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesSheetRoutingModule { }
