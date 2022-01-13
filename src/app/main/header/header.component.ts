import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '@shared/components/language-switcher/language-switcher.component';
import { AppNotificationService } from 'src/app/@skolera/services/app-notification.service';
import { UserSerivce } from 'src/app/@skolera/services/user.service';
import { Globals } from 'src/app/core/globals';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { baseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: any;
  user: any;
  selectedLanguage: any;
  avatarURL: any;
  userInfo: any

  constructor(
    private globals: Globals,
    private userService: UserSerivce,
    private translate: TranslateService,
    private authenticationService: AuthenticationService,
    private appNotificationService: AppNotificationService,
    private dialog: MatDialog
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
          this.appNotificationService.push(this.translate.instant('tr_unexpected_error_message"'), 'error');
        }

      }
    );
  }

  setUserLanguage() {
    document.querySelector('body')?.setAttribute('dir', this.globals.currentUser.locale !== 'ar' ? 'ltr' : 'rtl');
    this.userService.getCurrentUser(this.currentUser.id).subscribe(Response => {
      this.user = Response;
      this.globals.currentUser.locale = this.user.locale;
      this.selectedLanguage = this.user.locale;
      localStorage.setItem('currentUser', JSON.stringify(this.globals.currentUser));
      this.translate.use(this.user.locale);
      document.querySelector('body')?.setAttribute('dir', this.user.locale !== 'ar' ? 'ltr' : 'rtl');
    });
  }

  logout() {
    this.authenticationService.logout();
  }
  openChangeLanguageDailog() {
    const dialogRef = this.dialog.open(LanguageSwitcherComponent, {
        width: '400px',
        data: this.globals.currentUser.locale,
        disableClose: true,
    });
}
  openSidebar() {
    document.body.classList.add('sidebar-active');
  }
}
