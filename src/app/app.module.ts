import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Globals } from './core/globals';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AuthenticationGuard } from './core/guards';
import localeFr from '@angular/common/locales/fr';
import localeAr from '@angular/common/locales/ar';
import { CommonModule, registerLocaleData } from '@angular/common';
import { AuthenticationService } from '@core/services/authentication.service';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserSerivce } from '@skolera/services/user.service';
registerLocaleData(localeFr, 'fr');
registerLocaleData(localeAr, 'ar');

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    CoreModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient],
      }
    })
  ],
  
  providers: [Globals,AuthenticationGuard,AuthenticationService,UserSerivce],
  bootstrap: [AppComponent]
})
export class AppModule { }
