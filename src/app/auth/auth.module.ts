import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth.routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginBackgroundComponent } from '../@skolera/components/login-background/login-background.component';


@NgModule({
    imports: [
        AuthRoutingModule,
        ReactiveFormsModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        LoginComponent,
        LoginBackgroundComponent
    ]
})
export class AuthModule { }