import {Component, ElementRef, OnInit, QueryList, ViewChild} from '@angular/core';

@Component({
  selector: 'app-admin-dashboard-analytics',
  templateUrl: './admin-dashboard-analytics.page.html',
  styleUrls: ['./admin-dashboard-analytics.page.scss'],
})
export class AdminDashboardAnalyticsPage implements OnInit {

  constructor() { }

  @ViewChild('chart1') chart1Element: QueryList<ElementRef>;


  ngOnInit() {
  }

}
