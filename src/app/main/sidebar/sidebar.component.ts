import { Component, OnInit } from '@angular/core';
import { AdminSidebar } from 'src/app/@skolera/resources';
import { Globals } from 'src/app/core/globals';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  appSidebar;
  whitelabelUrl;
  actortypr: any;
  currentUserType:any;
  levelName = '';
  user: any = [{}];
  constructor(
      public globals: Globals
  ) {
      this.appSidebar = AdminSidebar;
      this.whitelabelUrl = '/./assets/images/skolera-logo/admin.svg'; 
  }

  ngOnInit() {
  }

}
