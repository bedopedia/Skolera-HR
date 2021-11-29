import { Component, OnInit } from '@angular/core';
import { AppNotificationService } from '@skolera/services/app-notification.service';
import { FedenaSyncService } from '@skolera/services/fedena-sync-service.service';

@Component({
  selector: 'fedena-sync',
  templateUrl: './fedena-sync.component.html',
  styleUrls: ['./fedena-sync.component.scss']
})
export class FedenaSyncComponent implements OnInit {
  syncButtonText = "Sync";
  isSyncing = true;
  intervalTime = 0; 
  constructor(
    private fedenaSyncService: FedenaSyncService,
    private appNotificationService:AppNotificationService
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
               this.syncButtonText = "Sync";
               if (initialCheck == false)
                   this.appNotificationService.push("Sync successfully finished", 'success');
           }
           else if (syncStatus == 'failed' ){
               this.syncButtonText = "Sync";
               if (initialCheck == false)
                   this.appNotificationService.push("Sync failed", 'error');
           }
           else if (syncStatus == 'started' ){
               this.syncButtonText = "Syncing.."
               this.intervalTime = 1000*60*5; // 5 minutes
               this.checkSyncStatus();
           }
       },
       error => {
           this.isSyncing = false;
           this.appNotificationService.push(error.statusText, 'error');
       }); 
}
  syncFedena() {
    this.fedenaSyncService.hrSync().subscribe(
      (response: any) => {
          this.intervalTime = 1000*60*10; // 10 minutes Initial time
          this.isSyncing = true;
          this.syncButtonText = "Syncing.."
          this.appNotificationService.push('Sync started', 'success')
          this.checkSyncStatus();
      },
      error => {
          this.isSyncing = false;
          this.appNotificationService.push(error.error.message, 'error');
      }); 
  }


}
