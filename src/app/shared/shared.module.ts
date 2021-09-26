import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '@core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { GhostLineComponent } from './components/ghost-line/ghost-line.component';
import { SkoleraPagination } from './components/skolera-pagination/skolera-pagination';
import {NgSelectModule} from '@ng-select/ng-select';



@NgModule({
  declarations: [GhostLineComponent,SkoleraPagination],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    CoreModule.forRoot(),
    NgSelectModule,
    TranslateModule,
  ],
  exports: [
    GhostLineComponent,
    NgSelectModule,
    SkoleraPagination,
    TranslateModule,
    CommonModule,
    FormsModule,
  ]
})
export class SharedModule { }
