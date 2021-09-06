import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppNotificationService } from 'src/app/@skolera/services/app-notification.service';
import { UserSerivce } from 'src/app/@skolera/services/user.service';
import { Globals } from 'src/app/core/globals';
import { CurrentUser } from 'src/app/core/models/current-user.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { baseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: any;
  user :any;
  selectedLanguage:any;
  avatarURL: any;
  userInfo: any

  constructor(
    private globals: Globals,
    private userService: UserSerivce,
    private translate: TranslateService,
    private authenticationService: AuthenticationService,
    private appNotificationService: AppNotificationService
  ) { }

  ngOnInit(): void {
    this.avatarURL = baseUrl + this.globals.currentSchool.avatar_url;
    this.currentUser = this.authenticationService.getCurrentUser();
    this.setUserLanguage();
    this.getUserInfo();
  }
  getUserInfo() {
    this.userService.getUserHeaderData(this.currentUser.user_type.concat('s'), this.currentUser.actable_id).subscribe(
            (response: any) => {
                this.userInfo = response;
            },
            error => {
                if (error.status != 403) {
                    this.appNotificationService.push('There was an unexpected error, please reload', 'error');
                }
               
            }
        );
}

  setUserLanguage() {
    document.querySelector('body')?.setAttribute('dir', this.globals.currentUser.locale !== 'ar' ? 'ltr' : 'rtl');
    console.log("his.globals.currentUser.locale",this.currentUser,this.globals.currentUser.locale);
    
    this.userService.getCurrentUser(this.currentUser.id).subscribe(Response => {
        this.user = Response;
        this.globals.currentUser.locale = this.user.locale;
        this.selectedLanguage = this.user.locale;
        localStorage.setItem('currentUser', JSON.stringify(this.globals.currentUser));
        this.translate.use(this.user.locale);
        document.querySelector('body')?.setAttribute('dir', this.user.locale !== 'ar' ? 'ltr' : 'rtl');
    });
}
}
