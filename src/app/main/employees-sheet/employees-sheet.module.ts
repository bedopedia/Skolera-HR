import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesSheetRoutingModule } from './employees-sheet-routing.module';
import { SheetsListComponent } from './sheets-list/sheets-list.component';
import { SheetFormComponent } from './sheet-form/sheet-form.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    SheetsListComponent,
    SheetFormComponent
  ],
  imports: [
    CommonModule,
    EmployeesSheetRoutingModule,
    SharedModule
  ],
  entryComponents: [SheetFormComponent],
})
export class EmployeesSheetModule { }
