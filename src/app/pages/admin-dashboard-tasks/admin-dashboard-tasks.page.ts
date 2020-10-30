import {Component, OnInit} from '@angular/core';

import {Task} from '../../model/task';
import {TaskService} from '../../services/task/task.service';
import {PopoverController, ToastController} from '@ionic/angular';
import {ChallengePopoverComponent} from 'src/app/challenge-popover/challenge-popover.component';
import {UserService} from 'src/app/services/user/user.service';
import {RewardsService} from 'src/app/services/rewards/rewards.service';
import {User} from 'src/app/model/user';

@Component({
    selector: 'app-admin-dashboard-tasks',
    templateUrl: './admin-dashboard-tasks.page.html',
    styleUrls: ['./admin-dashboard-tasks.page.scss'],
})
export class AdminDashboardTasksPage implements OnInit {
    tasks: Array<Task>;
    tasksObserve: Task[];
    users: Array<User>;
    winnerId: string;
    today: Date = new Date();


    constructor(private rewardsService: RewardsService, private taskService: TaskService, public popoverController: PopoverController,
                private userService: UserService, public toastController: ToastController) {
        this.taskService.getAllAvailableTasks().subscribe(data => {
            this.tasks = data;
            console.log(this.tasks);
            this.tasks.forEach((task) => {

                task.startTimeIso = task.startTime.toISOString();
                task.endTimeIso = task.endTime.toISOString();
            });
        });

        this.userService.getUsers().subscribe(data => this.users = data);
    }

    editTask(task: Task) {
        console.log(task);

        this.assign(task, task.assignee);

        task.startTime = new Date(task.startTimeIso);
        task.endTime = new Date(task.endTimeIso);
        task.startTime.setHours(0, 0, 0, 0);
        task.endTime.setHours(23, 59, 59, 999);
        this.taskService.editTask(task).then(
            res => {
                console.log(res);
                this.presentToast();
            },
            err => console.log(err)
        );
    }

    async presentToast() {
        const controller = await this.toastController.create({
            color: 'dark',
            duration: 2000,
            message: 'Task edited successfully!',
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

    async presentPopover(event) {
        const popover = await this.popoverController.create({
            component: ChallengePopoverComponent,
            event
        });
        return await popover.present();
    }

    ngOnInit() {
    }

    updateAllTasks(newTasks: Array<Task>) {
        this.tasks = newTasks;
    }

    identifyTask(task: Task) {
        console.log(task);
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].title === task.title) {
                this.tasks.splice(i, 1);
            }
        }
    }

    endTask(task: Task) {
        this.taskService.finishTask(task).then(
            res => console.log(res),
            err => console.log(err)
        );
    }

    assign(task: Task, userId: string) {
        console.log(userId);
        this.taskService.setAssignee(task, userId).then(
            res => console.log(res),
            err => console.log(err)
        );

        this.rewardsService.winChallenge(task.id, userId).then(
            res => console.log(res),
            err => console.log(err)
        );
    }
}
