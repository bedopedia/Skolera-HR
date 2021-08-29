import { Component, OnInit, Inject } from '@angular/core';
import { AuthenticationService } from '@core/services';
import { HeaderComponent } from 'src/app/main/header/header.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Globals } from '@core/globals';
import { UserSerivce } from '@skolera/services/user.service';

@Component({
    selector: 'app-language-switcher',
    templateUrl: './language-switcher.component.html',
    styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent implements OnInit {

    currentUser;
    selectedLanguage;
    user;
    constructor(
        private authenticationService: AuthenticationService,
        public dialogRef: MatDialogRef<HeaderComponent>,
        private userService: UserSerivce,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private globals: Globals,
    ) { }

    ngOnInit() {
        this.selectedLanguage = this.data;
        this.currentUser = this.authenticationService.getCurrentUser();
    }

   
    switchLanguage() {
        let params = {
            id: this.currentUser.id,
            language: this.selectedLanguage,
        }
        this.userService.updateUser(this.currentUser.id, params).subscribe(response => {
            this.globals.updateUserLanguage.next(this.selectedLanguage);
            this.globals.currentUser = response;
            localStorage.setItem('currentUser', JSON.stringify(this.globals.currentUser));
            window.location.reload()
        })
    
        
        this.closeModal(this.selectedLanguage);
    }
    closeModal(language) {
        this.dialogRef.close(language);
    }

}
