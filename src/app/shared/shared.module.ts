import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '@core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { GhostLineComponent } from './components/ghost-line/ghost-line.component';
import { SkoleraPagination } from './components/skolera-pagination/skolera-pagination';
import {NgSelectModule} from '@ng-select/ng-select';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { VersionCheckService } from '@skolera/services/version-check.service';
import { SkoleraConfirmationComponent } from './components/skolera-confirmation/skolera-confirmation.component';
import { SkoleraMultiCheckboxComponent } from './components/skolera-multi-checkbox/skolera-multi-checkbox.component';



@NgModule({
  declarations: [GhostLineComponent,SkoleraPagination,SkoleraConfirmationComponent,SkoleraMultiCheckboxComponent],
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
    LoadingBarHttpClientModule,
    SkoleraConfirmationComponent,
    SkoleraMultiCheckboxComponent
  ],
  providers: [VersionCheckService]
})
export class SharedModule { }
