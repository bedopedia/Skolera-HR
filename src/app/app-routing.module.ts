import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '@core/guards';

const routes: Routes = [
  
    {path: 'home', loadChildren: './main/main.module#MainModule', outlet: 'primary'},
    {path: 'login', loadChildren: './auth/auth.module#AuthModule', outlet: 'primary'},
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
