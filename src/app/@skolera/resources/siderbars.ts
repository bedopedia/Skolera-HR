export const  AdminSidebar = [
  {
    name: 'tr_human_resources',
    routerLink: 'null',
    icon: 'fa fa-handshake-o icon',
    children: [
      {
        name: 'tr_home',
        routerLink: '/home',
      },
      {
        name: 'tr_employees',
        routerLink: 'employees',
      },
      {
        name: 'tr_time_groups',
        routerLink: 'time-groups',
      },
      {
        name: 'tr_rules',
        routerLink: '/rules',
      },
    ]
  },
 
 
];
