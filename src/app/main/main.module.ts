import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LanguageSwitcherComponent } from '@shared/components/language-switcher/language-switcher.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [
        MainComponent,
        HeaderComponent,
        SidebarComponent,
        LanguageSwitcherComponent],
    imports: [
        CommonModule,
        MainRoutingModule,
        SharedModule
    ],
    entryComponents: [LanguageSwitcherComponent]
})
export class MainModule { }
