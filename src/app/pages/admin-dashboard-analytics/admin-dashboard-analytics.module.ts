import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminDashboardAnalyticsPageRoutingModule } from './admin-dashboard-analytics-routing.module';

import { AdminDashboardAnalyticsPage } from './admin-dashboard-analytics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminDashboardAnalyticsPageRoutingModule
  ],
  declarations: [AdminDashboardAnalyticsPage]
})
export class AdminDashboardAnalyticsPageModule {}
