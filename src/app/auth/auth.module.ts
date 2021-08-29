import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth.routing.module';
import { SharedModule } from './../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginBackgroundComponent } from '@skolera/components/login-background/login-background.component';

@NgModule({
    imports: [
        AuthRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        ReactiveFormsModule,
        // NgxCaptchaModule

    ],
    declarations: [
        LoginComponent,
        LoginBackgroundComponent
    ]
})
export class AuthModule { }