import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminDashboardTasksPage } from './admin-dashboard-tasks.page';
import { ChallengePopoverComponent } from 'src/app/challenge-popover/challenge-popover.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardTasksPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [ChallengePopoverComponent],
  declarations: [AdminDashboardTasksPage, ChallengePopoverComponent]
})
export class AdminDashboardTasksPageModule {}
