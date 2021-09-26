import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CoreModule } from '@core/core.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { ItemGhostComponent } from './components/item-ghost/item-ghost.component';
import { GhostLineComponent } from './components/ghost-line/ghost-line.component';
import { SkoleraPagination } from './components/skolera-pagination/skolera-pagination';
import {NgSelectModule} from '@ng-select/ng-select';



@NgModule({
  declarations: [GhostLineComponent,ItemGhostComponent,SkoleraPagination],
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
    ItemGhostComponent,
    SkoleraPagination,
    TranslateModule,
    CommonModule,
    FormsModule,
  ]
})
export class SharedModule { }
