import {Component, OnInit} from '@angular/core';

import {Task} from '../../model/task';
import {TaskService} from '../../services/task/task.service';
import {PopoverController, ToastController} from '@ionic/angular';
import {ChallengePopoverComponent} from 'src/app/challenge-popover/challenge-popover.component';
import {UserService} from 'src/app/services/user/user.service';
import {RewardsService} from 'src/app/services/rewards/rewards.service';
import {User} from 'src/app/model/user';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-admin-dashboard-tasks',
    templateUrl: './admin-dashboard-tasks.page.html',
    styleUrls: ['./admin-dashboard-tasks.page.scss'],
})
export class AdminDashboardTasksPage implements OnInit {
    finishedTasksObserve: Observable<Task[]>;
    tasksObserve: Observable<Task[]>;
    users: Array<User>;
    winnerId: string;
    today: Date = new Date();


    constructor(private rewardsService: RewardsService, private taskService: TaskService, public popoverController: PopoverController,
                private userService: UserService, public toastController: ToastController) {
        this.userService.getUsergroup().then(group => {
            this.tasksObserve = this.taskService.getAllAvailableTasks(group).pipe(tap(el => console.log(el)));
            this.finishedTasksObserve = this.taskService.getAllFinishedTasks(group);

        }, err => console.log(err));

        this.userService.getUsers().subscribe(data => this.users = data);
    }

    editTask(task: Task) {
        console.log(task);

        this.assign(task, task.assignee);

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
        await this.toastController.create({
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

    endTask(task: Task) {
        this.taskService.finishTask(task).then(
            res => console.log(res),
            err => console.log(err)
        );
    }

    assign(task: Task, userId: string) {
        console.log(userId);
        this.taskService.assign(task, userId).then(
            res => console.log(res),
            err => console.log(err)
        );

        this.rewardsService.winChallenge(task.id, userId).then(
            res => console.log(res),
            err => console.log(err)
        );
    }

    async createMockData() {
        for (let i = 0; i < 10; i++) {
            this.createOneMockTask();
        }
    }

    createOneMockTask() {
        const today = new Date(Date.now());

        const randomNumDay = Math.random() * 30;
        const randomNumMonth = Math.random() * 2;
        const randomHour = Math.random() * 13;
        const randomMinute = Math.random() * 60;
        const randomMiliseconds = Math.random() * 60;

        const randomStartDate = new Date(today.getFullYear(), today.getMonth() - randomNumMonth, 31 - randomNumDay, 6 + randomHour, randomMinute, randomMiliseconds);

        const randomEndDate = new Date(randomStartDate);

        randomEndDate.setHours(20);
        randomEndDate.setMinutes(0);
        randomEndDate.setUTCMilliseconds(0);

        // determine random work start (with logic)

        const randomWorkStart = new Date(randomStartDate);
        let randomWorkStartHour = randomStartDate.getHours() + Math.random() * 10;
        let randomWorkStartMinute = randomStartDate.getMinutes() + Math.random() * 60;

        while (randomStartDate.getHours() > randomWorkStartHour || randomWorkStartHour > 19) {
            randomWorkStartHour = randomStartDate.getHours() + Math.random() * 10;
        }

        if (randomStartDate.getHours() === randomWorkStartHour) {
            while (randomStartDate.getMinutes() > randomWorkStartMinute || randomWorkStartMinute > 60) {
                randomWorkStartMinute = randomStartDate.getMinutes() + Math.random() * 60;
            }
        }

        randomWorkStart.setHours(randomWorkStartHour);
        randomWorkStart.setMinutes(randomWorkStartMinute);


        // determine random work end (with logic);
        const randomWorkEnd = new Date(randomStartDate);

        let randomWorkEndHour = randomWorkStartHour * Math.random() * 10;
        let randomWorkEndMinute = randomWorkStartMinute + Math.random() * 60;

        // The following line is an infinite loop due to "randomWorkEndHour > 19", which is always true if randomWorkEndHour is >19
        // while (randomWorkStart.getHours() > randomWorkEndHour || randomWorkEndHour > 19 || randomWorkEndHour < randomWorkStartHour) {
        while (randomWorkStart.getHours() > randomWorkEndHour || randomWorkEndHour < randomWorkStartHour) {
            randomWorkEndHour = randomWorkStartHour * Math.random() * 10;
        }

        if (randomWorkStartHour === randomWorkEndHour) {
            while (randomWorkStartMinute > randomWorkEndMinute || randomWorkEndMinute > 60) {
                randomWorkEndMinute = randomWorkStartMinute + Math.random() * 60;
            }
        }


        const taskTemplate = Object.values(Task.getTaskTypes())[(Math.random() * 9).toFixed(0)];

        const urgency = ['low', 'medium', 'high'];

        const customerAmount = parseInt(((Math.random() * 20) + 1).toFixed(0), 10);

        const store = Task.getStores()[(Math.random() * 7).toFixed(0)];

        const testTask = new Task('', taskTemplate.description, randomEndDate, randomStartDate, taskTemplate.title, taskTemplate.title,
            'employee', null, true, 'manager', true, false, randomWorkStart, randomWorkEnd,
            randomStartDate, urgency[Math.random() * 2], customerAmount, store);

        console.log(testTask);

        this.taskService.createTask(testTask);

    }
}
