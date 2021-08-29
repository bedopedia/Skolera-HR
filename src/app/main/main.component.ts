
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/services';
import { Globals } from '@core/globals';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';

@Component({
    selector: 'main-component',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
    currentUser;
    appTheme;
    arabicSelected: boolean = false;
    englishSelected: boolean = false;
    constructor(
        private authenticationService: AuthenticationService,
        public globals: Globals,
        private router: Router
    ) {
        this.currentUser = this.authenticationService.getCurrentUser();
        globals.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        document.body.classList.remove('admin_theme', 'teacher_theme', 'hod_theme', 'student_theme', 'female', 'parent_theme');
        document.body.classList.add(globals.currentUser.user_type + '_theme');
        if (this.currentUser.user_type == 'student' && this.currentUser.gender == 'female') {
            document.body.classList.add('female');
        }
    } 
    ngOnInit() {
        this.router.events.subscribe((event: RouterEvent) => {
            this.navigationInterceptor(event)
        })
    }

    onActivate(event) {
    }
    onDeactivate(event) {
    }
    // Shows and hides the loading spinner during RouterEvent changes
    navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationEnd) {
            document.body.classList.remove('sidebar-active')
            let activeRouterMenus = document.querySelectorAll('.anchor-container');
            for (let i = 0; i < activeRouterMenus.length; i++) {
                activeRouterMenus[i].classList.remove('children-active');
            }
        }
    }
}

