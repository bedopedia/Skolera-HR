import { Component, OnInit } from '@angular/core';
import { DialogRole, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PaginationData, TimeGroup } from '@core/models/skolera-interfaces.model';
import { TranslateService } from '@ngx-translate/core';
import { SkoleraConfirmationComponent } from '@shared/components/skolera-confirmation/skolera-confirmation.component';
import { AppNotificationService } from '@skolera/services/app-notification.service';
import { TimeGroupsSerivce } from '@skolera/services/time-groups.services';
import { CreateEditTimeGroupComponent } from '../create-edit-time-group/create-edit-time-group.component';

@Component({
  selector: 'app-time-groups-list',
  templateUrl: './time-groups-list.component.html',
  styleUrls: ['./time-groups-list.component.scss']
})
export class TimeGroupsListComponent implements OnInit {
  timeGroupsLoading: boolean = true;
  timeGroupsList: TimeGroup[] = [];
  paginationPerPage = 10;
  selectedtype: string;
  paginationData: PaginationData;
  timeGroupsType = ['fixed','shifts']
  isFilterOpen: boolean = false
  params: any = {
    page: 1,
    per_page: this.paginationPerPage,
  };
  constructor(
    private TimeGroupsSerivce: TimeGroupsSerivce,
    private dialog: MatDialog,
    private translateService: TranslateService,
    private timeGroupService: TimeGroupsSerivce,
    private appNotificationService: AppNotificationService
    
  ) { }

  ngOnInit(): void {
    this.getTimeGroups();
  }
  getTimeGroups() {
    this.TimeGroupsSerivce.getTimeGroups(this.params).subscribe((response: any) => {
      this.timeGroupsList = response.time_groups;
      this.paginationData = response.meta
      this.timeGroupsLoading = false;

    })
  }

  deleteTimeGroup(timeGroup:TimeGroup) {
    let data = {
        title: this.translateService.instant("tr_time_group_confirmation_message"),
        buttons: [
            {
                label: this.translateService.instant("tr_action.cancel"),
                actionCallback: 'cancel',
                type: 'btn-secondary'
            },
            {
                label: this.translateService.instant("tr_action.delete"),
                actionCallback: 'delete',
                type: 'btn-danger'
            }
        ]
    }

        const dialogRef = this.dialog.open(SkoleraConfirmationComponent, {
            width: '650px',
            data: data,
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result == 'delete') {
              this.timeGroupService.deleteTimeGroup(timeGroup.id!).subscribe(response => {
                this.appNotificationService.push(this.translateService.instant('tr_time_group_deleted_successfully'), 'success');
                this.getTimeGroups()
              })
            }
        })
    
}
 
  createTimeGroup(action: string,timeGroup?: TimeGroup){

    this.dialog.open(CreateEditTimeGroupComponent, {
      width: '700px',
      data: action == 'edit' ? {action: action, timeGroup:timeGroup}: {action: action},
      disableClose: true,
  });
  }
  filterTimeGroups(event: any, serchKey: string) {
    let term = (serchKey == 'by_type') ? event : event.target.value
    if(event === null){
      delete this.params['by_type'];
    }
    else {
      this.params[serchKey] = term;
    }
    this.getTimeGroups();
  }
  paginationUpdate(page: number) {
    this.params.page = page;
    this.getTimeGroups();
  }

}
