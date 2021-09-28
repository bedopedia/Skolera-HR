import { Component, OnInit } from '@angular/core';
import { PaginationData, TimeGroup } from '@core/models/skolera-interfaces.model';
import { TimeGroupsSerivce } from '@skolera/services/time-groups.services';

@Component({
  selector: 'app-time-groups-list',
  templateUrl: './time-groups-list.component.html',
  styleUrls: ['./time-groups-list.component.scss']
})
export class TimeGroupsListComponent implements OnInit {
  timeGroupsLoading: boolean = false;
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
    private TimeGroupsSerivce: TimeGroupsSerivce
  ) { }

  ngOnInit(): void {
    this.getTimeGroups();
  }
  getTimeGroups() {
    this.TimeGroupsSerivce.getTimeGroups(this.params).subscribe((response: any) => {
      this.timeGroupsList = response.time_groups;
      this.paginationData = response.meta

    })
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
