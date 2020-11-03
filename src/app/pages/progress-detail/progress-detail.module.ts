import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProgressDetailPage } from './progress-detail.page';
// Calendar UI Module
import { CalendarModule } from 'ion2-calendar';

const routes: Routes = [
  {
    path: '',
    component: ProgressDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CalendarModule
  ],
  declarations: [ProgressDetailPage]
})
export class ProgressDetailPageModule {}
