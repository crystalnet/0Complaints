import {Component, OnInit} from '@angular/core';
import {PopoverController, ToastController} from '@ionic/angular';
import {AlertController} from '@ionic/angular';
import {Task} from '../model/task';
import {TaskService} from '../services/task/task.service';

@Component({
    selector: 'app-challenge-popover',
    templateUrl: './challenge-popover.component.html',
    styleUrls: ['./challenge-popover.component.scss'],
})
export class ChallengePopoverComponent implements OnInit {

    task: Task;
    startTime: any;
    endTime: any;

    constructor(public popoverController: PopoverController, private taskService: TaskService, public alertController: AlertController,
                public toastController: ToastController) {
        this.task = new Task();
        console.log(this.task);

    }

    ngOnInit() {
    }

    async presentToast() {
        await this.toastController.create({
            color: 'dark',
            duration: 2000,
            message: 'Task added successfully!',
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

        this.task.startTime = new Date(this.startTime);

    }

    convertEndDate() {

        this.task.endTime = new Date(this.endTime);

    }

    addChallenge() {
        console.log(this.task);

        this.task.startTime.setHours(0, 0, 0, 0);
        this.task.endTime.setHours(23, 59, 59, 999);


        if (this.task.startTime.getTime() - this.task.endTime.getTime() > 0) {
            return;
        }

        this.taskService.createTask(this.task).then(
            (challenge) => {
                console.log(challenge);
                this.presentToast();
            })
            .catch(err => console.error(err)
            );
    }


}
