import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Globals } from './core/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    subscriptions: Subscription[] = [];

    constructor(
        private translate: TranslateService,
        private globals: Globals
    ) {
      translate.setDefaultLang('en');
    }

    ngOnInit() {
    
    }

   


    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
  }