import { Component } from '@angular/core';
import { Globals } from '@core/globals';
import { AuthenticationService } from '@core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        public globals: Globals,
        private authenticationService: AuthenticationService
    ) {

    }
    logout(){
        this.authenticationService.logout();
    }
}
