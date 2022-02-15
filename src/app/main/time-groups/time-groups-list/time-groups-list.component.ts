import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaginationData } from '@core/models/skolera-interfaces.model';
import { TimeGroup } from '@core/models/time-groups-interface.model';
import { TranslateService } from '@ngx-translate/core';
import { SkoleraConfirmationComponent } from '@shared/components/skolera-confirmation/skolera-confirmation.component';
import { AppNotificationService } from '@skolera/services/app-notification.service';
import { TimeGroupsSerivce } from '@skolera/services/time-groups.services';
import { Subscription } from 'rxjs';
import { CreateTimeGroupComponent } from '../create-time-group/create-time-group.component';


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
  timeGroupsType = ['fixed', 'shifts']
  isFilterOpen: boolean = false;
  checkedCells: number[] = [];
  allChecked: boolean = false;
  partiallyChecked: boolean = false;
  private subscriptions: Subscription[] = [];
  cells: number[] = [];
  params: any = {
    page: 1,
    per_page: this.paginationPerPage,
  };
  searchTimeout: any;
  nameSearchTerm: string;
  isNotAuthorized: boolean = false;

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
    this.resetCheckboxes()
    this.timeGroupsLoading = true;
    this.TimeGroupsSerivce.getTimeGroups(this.params).subscribe((response: any) => {
      this.timeGroupsList = response.time_groups;
      this.cells = response.time_groups.map((timeGroup: TimeGroup) => timeGroup.id);
      this.paginationData = response.meta
      this.timeGroupsLoading = false;
    },error=> {
      if(error.status == 403) {
        this.isNotAuthorized = true;
      }
    })
  }

  deleteTimeGroup( timeGroup?: TimeGroup) {
    if(timeGroup?.number_of_employees! > 0 ){
      this.appNotificationService.push(this.translateService.instant('tr_delete_time_group_message'), 'error');
      return
    }

    const data = {
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
        this.subscriptions.push(this.timeGroupService.deleteTimeGroup(timeGroup!.id!).subscribe(response => {
          this.appNotificationService.push(this.translateService.instant('tr_deleted_successfully'), 'success');
          this.getTimeGroups()
        }))

      }
    })

  }

  createTimeGroup() {
    let dialogRef = this.dialog.open(CreateTimeGroupComponent, {
      width: '750px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'update') {
        this.getTimeGroups();
      }
    })
  }

  resetCheckboxes() {
    this.checkedCells = [];
    this.allChecked = false;
    this.partiallyChecked = false;
}

  filterTimeGroups(event: any, searchKey: string) {
    clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            let term = (searchKey == 'by_type') ? event : event.target.value.trim()
            if (event === null) {
              delete this.params['by_type'];
            }
            else {
              this.params[searchKey] = term;
            }
            this.params['page'] = 1
            this.getTimeGroups();
        }, 1000);
  }
  
  paginationUpdate(page: number) {
    this.params.page = page;
    this.getTimeGroups();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s && s.unsubscribe())
  }

}
