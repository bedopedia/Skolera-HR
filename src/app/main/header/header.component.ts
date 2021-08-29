import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Globals } from '@core/globals';
import { AuthenticationService } from '@core/services';
import { Router } from '@angular/router';
import { baseUrl } from '../../../environments/environment';

import { MatDialog } from '@angular/material';
import 'src/assets/scripts/support-plugin.js';
import { LanguageSwitcherComponent } from '@shared/components/language-switcher/language-switcher.component';
declare var FreshWidget: any;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    userRole;
    selectedLanguage;
    avatarURL;
    messageThreads:any = [{ id: 5 }]; // initial dump value before getting messages
    messagesLoader = true;
    messagesLoaded = true;
    notificationssLoaded = true;
    notificationssLoader = true;
    currentUser;
    user;
    unseenNotificationsCount;
    announcementCount;
    announcements;
    announcementsLoader = true;
    loadNotifications = false;
    getAnnouncement = false;
    userInfo;
    constructor(
        private translate: TranslateService,
        private authenticationService: AuthenticationService,
        private router: Router,
        public globals: Globals,
        private dialog: MatDialog
    ) {
        this.userRole = globals.currentUser.user_type;

    }

    ngOnInit() {
        if (FreshWidget.hasOwnProperty('init')) {
            FreshWidget.init('', {
                'queryString': '&widgetType=popup&formTitle=Skolera+Support&submitTitle=Send+Message&submit' +
                    'Thanks=Your+message+has+been+delivered.+One+of+our+support+agents+will+contact+you+shortly.', 'utf8': '?',
                'widgetType': 'popup', 'buttonType': 'text', 'buttonText': '', 'buttonColor':
                    'black', 'buttonBg': '#42f4b3', 'alignment': '3', 'offset': '235px', 'submitThanks': 'Your message has been deli' +
                        'vered. One of our support agents will contact youshortly.', 'formHeight': '500px', 'url': 'https://skoleraulp.freshdesk.com'
            });
        }
        this.avatarURL = baseUrl + this.globals.currentSchool.avatar_url;
        this.currentUser = this.authenticationService.getCurrentUser();
        this.setUserLanguage();
    }
    showSupportModal() {
        FreshWidget.show();
    }
    ngOnDestroy() {
    }
 
    setUserLanguage() {
        document.querySelector('body').setAttribute('dir', this.globals.currentUser.locale !== 'ar' ? 'ltr' : 'rtl');
        // this.userService.getCurrentUser(this.currentUser.id).subscribe(Response => {
        //     this.user = Response;
        //     this.globals.currentUser.locale = this.user.locale;
        //     this.selectedLanguage = this.user.locale;
        //     localStorage.setItem('currentUser', JSON.stringify(this.globals.currentUser));
        //     this.translate.use(this.user.locale);
        //     document.querySelector('body').setAttribute('dir', this.user.locale !== 'ar' ? 'ltr' : 'rtl');
        // });
    }




    closeModal(id: string) {
        // this.modalService.close(id);
    }
    openChangeLanguageDailog() {
        const dialogRef = this.dialog.open(LanguageSwitcherComponent, {
            width: '400px',
            data: this.globals.currentUser.locale,
            disableClose: true,
        });
    }

    logout() {
        this.authenticationService.logout();
    }

    openSidebar() {
        document.body.classList.add('sidebar-active');
    }


}
