import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './core/guards';

const routes: Routes = [
  {path: '', redirectTo: 'employees', pathMatch: 'full'},
  {path: 'employees', loadChildren: () => import("./main/main.module").then(m => m.MainModule), canActivate: [AuthenticationGuard]},
  {path: 'login',  loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule),outlet: 'primary'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
