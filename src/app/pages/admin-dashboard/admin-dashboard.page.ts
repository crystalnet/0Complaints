import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {

  pages = [
    {
      title: 'User Management',
      url: '/admin-dashboard/appconfig'
    },
    {
      title: 'Tasks',
      url: '/admin-dashboard/tasks'
    },
    {
      title: 'Analytics',
      url: '/admin-dashboard/analytics'
    },
    {
      title: 'Export',
      url: '/admin-dashboard/export'
    },
    // {
    //   title: 'Notifications',
    //   url: '/admin-dashboard/notifications'
    // },
    {
      title: 'Employee View',
      url: '/menu/dashboard/dashboard/detail'
    }
  ];

  selectedPath = '';
  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
   }

  ngOnInit() {
  }

}
