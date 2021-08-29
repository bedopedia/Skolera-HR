import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationService} from './services';
import {AuthenticationGuard, RoleGuard, CanDeactivateGuard} from './guards';
import {TimeDateService} from './services/time-date.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FileHelperService} from './services/file-helper.service';
import { HttpConfigInterceptor } from './services/httpconfig.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: []
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AuthenticationService,
        AuthenticationGuard,
        RoleGuard,
        CanDeactivateGuard,
        FileHelperService,
        TimeDateService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpConfigInterceptor,
          multi: true
        }
      ]
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpConfigInterceptor,
          multi: true
        }
      ]
    };
  }
}
