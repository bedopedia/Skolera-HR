import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import { RouterModule } from '@angular/router';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Globals } from '../core/globals';
import { UserSerivce } from '../@skolera/services/user.service';
import { AuthenticationService } from '../core/services/authentication.service';
import { AppNotificationService } from '../@skolera/services/app-notification.service';
import { CoreModule } from '@core/core.module';
import { LanguageSwitcherComponent } from '@shared/components/language-switcher/language-switcher.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '@shared/shared.module';
import { SystemAlertsComponent } from './system-alerts/system-alerts.component';
import { TimeGroupsSerivce } from '@skolera/services/time-groups.services';
import { RulesSerivce } from '@skolera/services/rules.services';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    SidebarComponent,
    LanguageSwitcherComponent,
    SystemAlertsComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    TranslateModule,
    LoadingBarModule,
    RouterModule,
    FormsModule,
    MatDialogModule,
    LoadingBarRouterModule,
    SharedModule,
    LoadingBarHttpClientModule,
    HttpClientModule,
    LoadingBarRouterModule,
    CoreModule.forRoot(),
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
        },
    })
],
entryComponents: [LanguageSwitcherComponent],
providers: [
    TranslateService,
    Globals,
    UserSerivce,
    AuthenticationService,
    AppNotificationService,
    TimeGroupsSerivce,
    RulesSerivce 
],

})
export class MainModule { }
