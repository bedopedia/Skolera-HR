import { Injectable } from '@angular/core';
import { Router, CanActivateChild, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Globals } from '@core/globals';

@Injectable()
export class RoleGuard implements CanActivate, CanActivateChild {

    constructor(
        private router: Router,
        private globals: Globals
    ) { }

    canActivate(next: ActivatedRouteSnapshot) {
        if (next.data.allowedRoles.includes(this.globals.currentUser.user_type)) {
            return true;
        }
        this.router.navigate(['home']);

        return false;
    }
    canActivateChild(next: ActivatedRouteSnapshot) {
        
        if (next.data.allowedRoles.includes(this.globals.currentUser.user_type)) {
            return true;
        }
        this.router.navigate(['home']);

        return false;
    }

}
