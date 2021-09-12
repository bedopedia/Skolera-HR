import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationGuard} from './guards';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HttpConfigInterceptor } from '@skolera/services/httpconfig.interceptor';
import { AuthenticationService } from './services/authentication.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: []
})
export class CoreModule {
  static forRoot(): ModuleWithProviders{
    return {
      ngModule: CoreModule,
      providers: [
        AuthenticationService,
        AuthenticationGuard,
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
