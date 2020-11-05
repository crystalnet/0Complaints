import {Component, OnInit} from '@angular/core';
import {PopoverController, ToastController} from '@ionic/angular';
import {AlertController} from '@ionic/angular';
import {Shift} from '../model/shift';
import {ShiftService} from '../services/shift/shift.service';

@Component({
    selector: 'app-challenge-popover',
    templateUrl: './challenge-popover.component.html',
    styleUrls: ['./challenge-popover.component.scss'],
})
export class ChallengePopoverComponent implements OnInit {

    challenge: Shift;
    startTime: Date;
    endTime: Date;

    constructor(public popoverController: PopoverController, private shiftService: ShiftService, public alertController: AlertController,
                public toastController: ToastController) {
        this.challenge = new Shift();
        console.log(this.challenge);

    }

    ngOnInit() {
    }

    async presentToast() {
        await this.toastController.create({
            color: 'dark',
            duration: 2000,
            message: 'Challenge added successfully!',
            buttons: [
                {
                    text: 'Done',
                    role: 'cancel'
                }
            ]
        }).then(toast => {
            toast.present();
        });
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Success',
            message: 'Challenge added successfully!',
            buttons: ['OK'],
        });

        await alert.present();
        const result = await alert.onDidDismiss();
        console.log(result);
    }

    convertStartDate() {

        this.challenge.startTime = new Date(this.startTime);

    }

    convertEndDate() {

        this.challenge.endTime = new Date(this.endTime);

    }

    addChallenge() {
        console.log(this.challenge);

        this.challenge.startTime.setHours(0, 0, 0, 0);
        this.challenge.endTime.setHours(23, 59, 59, 999);


        if (this.challenge.startTime.getTime() - this.challenge.endTime.getTime() > 0) {
            return;
        }

        this.shiftService.createShift(this.challenge).then(
            (challenge) => {
                console.log(challenge);
                this.presentToast();
            })
            .catch(err => console.error(err)
            );
    }


}
