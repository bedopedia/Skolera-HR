import {NgModule, ModuleWithProviders} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {Globals} from '@core/globals';
import {AppNotificationService, ModalService} from '@shared/services';
import {
  ModalComponent,
  SkoleraEditorComponent,
  PopupMessageComponent,
  ComponentLoader,
  SkoleraTooltipComponent,
  SkoleraLightboxComponent,
  SkoleraConfirmationComponent,
} from '@shared/components';
import {
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatTooltipModule,
  MatSort,
  MatSortModule
} from '@angular/material';
import {NgSelectModule} from '@ng-select/ng-select';
import {TranslateModule} from '@ngx-translate/core';
import {SkoleraPagination} from './components/skolera-pagination/skolera-pagination';
import {MatTableModule} from '@angular/material/table';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {htmlToPlain} from './pipes/html-to-plain.pipe';
import {SafeHtmlPipe} from './pipes/safe-html.pipe';
import {NgxTinymceModule} from 'ngx-tinymce';
import {SkoleraMultiCheckboxComponent} from './components/skolera-multi-checkbox/skolera-multi-checkbox.component';
import { CoreModule } from '@core/core.module';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { VersionCheckService } from './services/version-check.service';
import { TranslateDatePipe } from './pipes/translate-date.pipe';
import { ScrollFullTableComponent } from './components/scroll-full-table/scroll-full-table.component';
import { ScientificEquationService } from './components/scientific-equation/scientific-equation.service';
import { ScientificEquationDirective } from './components/scientific-equation/scientific-equation.directive';
import { RouterModule } from '@angular/router';
import { UploadService } from '@skolera/services/upload.service';
import { UserSerivce } from '@skolera/services/user.service';
@NgModule({
  declarations: [
    ModalComponent,
    SkoleraEditorComponent,
    PopupMessageComponent,
    ComponentLoader,
    SkoleraPagination,
    SkoleraTooltipComponent,
    SkoleraLightboxComponent,
    SkoleraConfirmationComponent,
    htmlToPlain,
    SafeHtmlPipe,
    TranslateDatePipe,
    SkoleraMultiCheckboxComponent,
    NotAuthorizedComponent,
    TranslateDatePipe,
    ScrollFullTableComponent,
    ScientificEquationDirective,
  ],
  imports: [
    ScrollingModule,  
    FormsModule,
    HttpClientModule,
    TranslateModule,
    CommonModule,
    NgSelectModule,
    CoreModule,
    RouterModule,
    NgxTinymceModule.forRoot({
      baseURL: 'assets/tinymce'
    }),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ModalComponent,
    SkoleraEditorComponent,
    PopupMessageComponent,
    ComponentLoader,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    NgSelectModule,
    TranslateModule,
    SkoleraPagination,
    SkoleraTooltipComponent,
    MatTableModule,
    MatSortModule,
    SkoleraLightboxComponent,
    LoadingBarHttpClientModule,
    SkoleraConfirmationComponent,
    htmlToPlain,
    SafeHtmlPipe,
    TranslateDatePipe,
    SkoleraMultiCheckboxComponent,
    NotAuthorizedComponent,
    ScrollFullTableComponent,
    ScientificEquationDirective,
  ],
  providers: [VersionCheckService],
  entryComponents: [SkoleraConfirmationComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ModalService,
        AppNotificationService,
        Globals,
        SkoleraEditorComponent,
        ScientificEquationService,
        UploadService,
        UserSerivce
      ]
    };
  }
}
