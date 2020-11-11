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
      title: 'AppConfig',
      url: '/admin-dashboard/appconfig'
    },
    {
      title: 'Export',
      url: '/admin-dashboard/export'
    },
    {
      title: 'Tasks',
      url: '/admin-dashboard/tasks'
    },
    {
      title: 'Notifications',
      url: '/admin-dashboard/notifications'
    },
    {
      title: 'Analytics',
      url: '/admin-dashboard/analytics'
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
