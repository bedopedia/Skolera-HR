import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesSheetRoutingModule } from './employees-sheet-routing.module';
import { SheetsListComponent } from './sheets-list/sheets-list.component';
import { SheetFormComponent } from './sheet-form/sheet-form.component';
import { SharedModule } from '@shared/shared.module';
import { EmployeesSerivce } from '@skolera/services/employees.services';
import { UploadFilesWithPreSignedUrlService } from '@skolera/services/upload_files_with_presigned_Url.service';


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
  providers: [EmployeesSerivce,UploadFilesWithPreSignedUrlService],
  entryComponents: [SheetFormComponent],
})
export class EmployeesSheetModule { }
