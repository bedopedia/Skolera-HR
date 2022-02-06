import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppNotificationService } from '@skolera/services/app-notification.service';
import { FedenaSyncService } from '@skolera/services/fedena-sync-service.service';

@Component({
  selector: 'fedena-sync',
  templateUrl: './fedena-sync.component.html',
  styleUrls: ['./fedena-sync.component.scss']
})
export class FedenaSyncComponent implements OnInit {
  syncButtonText = this.translateService.instant('tr_sync');
  isSyncing = true;
  intervalTime = 0; 
  constructor(
    private fedenaSyncService: FedenaSyncService,
    private appNotificationService:AppNotificationService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.getSyncStatus(true);
  }
  checkSyncStatus () {
    setTimeout(() => {
       this.getSyncStatus()
    }, this.intervalTime)
}
getSyncStatus(initialCheck: boolean = false) {
  this.fedenaSyncService.getSyncStatus().subscribe(
       (response: any) => {
           let syncStatus = response.status;
           this.isSyncing = syncStatus == 'started';
           if (syncStatus == 'succeeded' ){
               this.syncButtonText = this.translateService.instant('tr_sync');
               if (initialCheck == false)
                   this.appNotificationService.push(this.translateService.instant('tr_sync_succeeded'), 'success');
           }
           else if (syncStatus == 'failed' ){
               this.syncButtonText = this.translateService.instant('tr_sync');
               if (initialCheck == false)
                   this.appNotificationService.push(this.translateService.instant('tr_sync_failed'), 'error');
           }
           else if (syncStatus == 'started' ){
               this.syncButtonText = this.translateService.instant('tr_syncing');
               this.intervalTime = 1000*60*5; // 5 minutes
               this.checkSyncStatus();
           }
       },
       error => {
            if (error.status != 422) {
              this.isSyncing = false;
            }
           this.appNotificationService.push(error.statusText, 'error');
       }); 
}
  syncFedena() {
    this.fedenaSyncService.hrSync().subscribe(
      (response: any) => {
          this.intervalTime = 1000*60*10; // 10 minutes Initial time
          this.isSyncing = true;
          this.syncButtonText = this.translateService.instant('tr_syncing');
          this.appNotificationService.push(this.translateService.instant('tr_start_sync'), 'success')
          this.checkSyncStatus();
      },
      error => {
          this.isSyncing = false;
          this.appNotificationService.push(error.error.message, 'error');
      }); 
  }


}
