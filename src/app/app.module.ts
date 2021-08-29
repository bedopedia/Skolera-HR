import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from '@shared/shared.module';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeAr from '@angular/common/locales/ar';
registerLocaleData(localeFr, 'fr');
registerLocaleData(localeAr, 'ar');


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json?cb=' + new Date().getTime());
}
@NgModule({
declarations: [
AppComponent
],
imports: [
BrowserModule,
AppRoutingModule,
SharedModule.forRoot(),
CoreModule.forRoot(),
MainModule,
LoadingBarRouterModule,
BrowserAnimationsModule,
AngularFireMessagingModule,
AngularFireDatabaseModule,
AngularFireAuthModule,
AngularFireModule.initializeApp(environment.firebase),
TranslateModule.forRoot({
loader: {
provide: TranslateLoader,
useFactory: HttpLoaderFactory,
deps: [HttpClient],
},
})
],
bootstrap: [AppComponent]
})
export class AppModule { }
