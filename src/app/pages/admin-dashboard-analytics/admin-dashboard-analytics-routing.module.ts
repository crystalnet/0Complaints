import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardAnalyticsPage } from './admin-dashboard-analytics.page';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardAnalyticsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashboardAnalyticsPageRoutingModule {}
