import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminDashboardShiftPageRoutingModule } from './admin-dashboard-shift-routing.module';

import { AdminDashboardShiftPage } from './admin-dashboard-shift.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminDashboardShiftPageRoutingModule
  ],
  declarations: [AdminDashboardShiftPage]
})
export class AdminDashboardShiftPageModule {}
