import { Component, OnInit, HostListener, AfterContentInit, AfterContentChecked, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Globals } from '@core/globals';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { VersionCheckService } from '@shared/services/version-check.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    onlineEvent: Observable<Event>;
    offlineEvent: Observable<Event>;
    subscriptions: Subscription[] = [];

    constructor(
        private translate: TranslateService,
        public globals: Globals,
        private versionCheckService: VersionCheckService,
    ) {
    }
    @HostListener("document:click", ["$event"])

    onDocumentClicked(ev) {
        if (ev.target.classList.contains('options-menu')) {
            ev.target.classList.toggle('active');
            if (ev.target.parentNode.classList.contains('active')) {
                this.fitMenu(ev.target);
            }
            console.log("1");
            
        }
        if (ev.target.closest('.options-menu')) {
            if (ev.target.parentNode.classList.contains('options-menu')) {
                ev.target.parentNode.classList.toggle('active');
                if (ev.target.parentNode.classList.contains('active')) {
                    this.fitMenu(ev.target.closest('.options-menu'));
                }
            }
            console.log("2");
        }
        let activeMenus = document.querySelectorAll('.options-menu.active');
        for (let i = 0; i < activeMenus.length; i++) {
            if (
                !(
                    ev.target.closest('.notifications-menu') === activeMenus[i]
                    || (
                        ev.target.closest('.options-menu') === activeMenus[i]
                        && !ev.target.closest('.options-menu-container')
                    )
                    || (ev.target === activeMenus[i])
                    || (ev.target.closest('.options-menu') === activeMenus[i] && ev.target.closest('.prevent'))
                )
                || ev.target.closest('.close-notifications-menu')
                || ev.target.classList.contains('close-notifications-menu')
            ) {
                console.log("3");
                activeMenus[i].classList.remove('active');
            }
        }
        if (ev.target.closest('.checkbox-with-child .checkbox-arrow')) {
            let checkboxArrow = ev.target.closest('.checkbox-with-child .checkbox-arrow');
            let checkboxParentContainer = checkboxArrow.closest('.checkbox-with-child');
            let children = checkboxParentContainer.querySelectorAll('.checkbox-with-child');
            if (checkboxParentContainer.classList.contains('active')) {
                for (let i = 0; i < children.length; i++) {
                    children[i].classList.remove('active')
                }
            }
            checkboxParentContainer.classList.toggle('active');
            if (checkboxParentContainer.classList.contains('active')) {
            }
            console.log("4");
        }
        // .
        // .
        // skolera tabs
        if (ev.target.closest('.skolera-tabs .navigation-links') && ev.target.classList.contains('single-link') || ev.target.classList.contains('skolera-tabs-link') || ev.target.closest('.skolera-tabs-link')) {
            ev.preventDefault();
            ev.stopPropagation();
            // let allNavigatioLinks = ev.target.closest('.skolera-tabs').querySelectorAll('.navigation-links .single-link');
            // let allContentContainers = ev.target.closest('.skolera-tabs').querySelectorAll('.content-container');
            // let slideContainer = ev.target.closest('.skolera-tabs').querySelectorAll('.tabs-content')[0];
            // let directionSign = document.querySelector('body').getAttribute('dir') == 'rtl' ? 1 : -1;
            // for (let i = 0; i < allNavigatioLinks.length; i++) {
            //     allNavigatioLinks[i].classList.remove('active');
            // }
            // for (let i = 0; i < allContentContainers.length; i++) {
            //     allContentContainers[i].classList.remove('active');
            // }
            // let activeContentContainer = ev.target.getAttribute('href').slice(1);
            // for (let i = 0; i < allContentContainers.length; i++) {
            //     if (allContentContainers[i].getAttribute('id') == activeContentContainer)
            //         slideContainer.style.transform = `translateX(${slideContainer.offsetWidth * i * directionSign}px)`;
            //         slideContainer.style.height = `translateX(${slideContainer.offsetWidth * i * directionSign}px)`;
            // }
            // ev.target.classList.add('active');
        }
    }
    @HostListener("document:keydown", ["$event"])
    onkeypress(ev) {
        // if (ev.keyCode === 27){}
    }
    @HostListener('window:resize', ['$event'])
    onResize() {
        let optionsMenuElements = document.querySelectorAll('.options-menu.active');
        for (let i = 0; i < optionsMenuElements.length; i++) {
            this.fitMenu(optionsMenuElements[i]);
        }
    }
    fitMenu(menu) {
        menu.classList.remove('reverse-v');
        menu.querySelectorAll('.options-menu-container')[0].style.maxHeight = 'none';
        menu.classList.remove('reverse-h');
        let offsetAndHeight = menu.querySelectorAll('.options-menu-container')[0].offsetHeight + menu.offsetTop;
        let widnowHeight = document.body.clientHeight;
        let outOfWindowVertically = offsetAndHeight - widnowHeight > 0 ? true : false;
        if (outOfWindowVertically) {
            menu.classList.add('reverse-v')
            menu.querySelectorAll('.options-menu-container')[0].style.maxHeight = (menu.offsetTop - 20) + 'px';
        }
    }
    getScreenSize(){
        if(window.innerWidth >=  992){
            this.globals.screenType = 'desktop';
        }
        else if (window.innerWidth <= 767){
            this.globals.screenType = 'mobile'
        }
        else{
            this.globals.screenType = 'tablet'
        }
    }
    ngOnInit() {
        if (environment.env === 'production') {
            this.versionCheckService.initVersionCheck('version.json');
        }
        this.onlineEvent = fromEvent(window, 'online');
        this.offlineEvent = fromEvent(window, 'offline');

        this.subscriptions.push(this.onlineEvent.subscribe(e => {
            this.globals.systemAlerts.noConnection = false;
          }));

          this.subscriptions.push(this.offlineEvent.subscribe(e => {
            this.globals.systemAlerts.noConnection = true;
          }));
        this.globals.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.globals.sessionHeaders = JSON.parse(localStorage.getItem('sessionHeaders'));
        this.translate.setDefaultLang('en');
        this.translate.use(this.globals.currentUser.locale);
        this.getScreenSize();
    }

   


    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
