import { Component, OnInit } from '@angular/core';
import { AdminSidebar } from '@skolera/resources';
import { Globals } from '@core/globals';
import {AppNotificationService} from '@shared/services';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    appSidebar;
    whitelabelUrl;
    actortypr;
    currentUserType;
    levelName = '';
    user: any = [{}];
    constructor(
        public globals: Globals,
        private appNotificationService: AppNotificationService,
    ) {
        switch (globals.currentUser.user_type) {
            case 'admin':
                this.appSidebar = AdminSidebar;
                this.whitelabelUrl = './assets/images/skolera-logo/admin.svg';
                break;
        }

    }

    ngOnInit() {
    }

    toggleChildren(event) {
        event.preventDefault();
        event.stopPropagation();
        event.target.parentElement.classList.toggle('children-active');
    }
    closeSidebar() {
        document.body.classList.remove('sidebar-active');
    }


  notImplementedYet() {
    this.appNotificationService.push('Coming soon :D', 'warning');
  }
}
