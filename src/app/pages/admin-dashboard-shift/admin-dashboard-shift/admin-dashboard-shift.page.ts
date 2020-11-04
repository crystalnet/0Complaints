import { Component, OnInit } from '@angular/core';
import { ShiftService } from 'src/app/services/shift/shift.service';
import { UserService } from 'src/app/services/user/user.service';
import {PopoverController, ToastController} from '@ionic/angular';


import {ChallengePopoverComponent} from 'src/app/cshift-popover/challenge-popover.component';

import {Shift} from '../../../model/shift';

import {User} from '../../../model/user';

@Component({
  selector: 'app-admin-dashboard-shift',
  templateUrl: './admin-dashboard-shift.page.html',
  styleUrls: ['./admin-dashboard-shift.page.scss'],
})
export class AdminDashboardShiftPage implements OnInit {

  shifts : Array<Shift>;

  users : Array<User>;


  constructor(private shiftService: ShiftService, private userService: UserService, public toastController: ToastController, public popoverController: PopoverController) { 

    this.shiftService.getAllActiveShiftsFromAllUsers().subscribe(data => {
      this.shifts = data;
      console.log(this.shifts);
  });


    this.userService.getUsers().subscribe(data => this.users = data);
  }

  ngOnInit() {
  }


  async presentPopover(event) {
    const popover = await this.popoverController.create({
        component: ChallengePopoverComponent,
        event
    });
    return await popover.present();
}



}
