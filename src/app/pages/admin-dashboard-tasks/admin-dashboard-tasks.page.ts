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
    finishedTasks: Array<Task>;
    tasksObserve: Task[];
    users: Array<User>;
    winnerId: string;
    today: Date = new Date();


    constructor(private rewardsService: RewardsService, private taskService: TaskService, public popoverController: PopoverController,
                private userService: UserService, public toastController: ToastController) {
        this.taskService.getAllAvailableTasks().subscribe(data => {
            this.tasks = data;
            console.log(this.tasks);
        });

        this.taskService.getAllFinishedTasks().subscribe(data => {
            this.finishedTasks = data;
            console.log(this.finishedTasks);
        });

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
        this.taskService.assign(task, userId).then(
            res => console.log(res),
            err => console.log(err)
        );

        this.rewardsService.winChallenge(task.id, userId).then(
            res => console.log(res),
            err => console.log(err)
        );
    }

    async createMockData(){
        for(var i = 0; i<10; i++){
        this.createOneMockTask();
        }
    }

    createOneMockTask(){

        let today = new Date(Date.now());

        let randomNumDay = Math.random()*30;
        let randomNumMonth = Math.random()*2;
        let randomHour = Math.random()*13;
        let randomMinute = Math.random()*60;
        let randomMiliseconds = Math.random()*60;

        let randomStartDate = new Date(today.getFullYear(), today.getMonth() - randomNumMonth, 31 - randomNumDay, 6+ randomHour, randomMinute, randomMiliseconds);

        let randomEndDate = new Date(randomStartDate);

        randomEndDate.setHours(20);
        randomEndDate.setMinutes(0);
        randomEndDate.setUTCMilliseconds(0);

        //determine random work start (with logic)

        let randomWorkStart = new Date(randomStartDate);
        let randomWorkStartHour = randomStartDate.getHours() + Math.random()*10;
        let randomWorkStartMinute = randomStartDate.getMinutes() + Math.random()*60;
        
        while(randomStartDate.getHours() > randomWorkStartHour || randomWorkStartHour > 19 ){
            randomWorkStartHour = randomStartDate.getHours() + Math.random()*10;
        }

        if(randomStartDate.getHours() == randomWorkStartHour) {
            while(randomStartDate.getMinutes() > randomWorkStartMinute || randomWorkStartMinute > 60 ){
                randomWorkStartMinute = randomStartDate.getMinutes() + Math.random()*60;
            }
        }

        randomWorkStart.setHours(randomWorkStartHour);
        randomWorkStart.setMinutes(randomWorkStartMinute);


        //determine random work end (with logic);
        let randomWorkEnd = new Date(randomStartDate);

        let randomWorkEndHour = randomWorkStartHour * Math.random()*10;
        let randomWorkEndMinute = randomWorkStartMinute + Math.random()*60;

        while(randomWorkStart.getHours() > randomWorkEndHour || randomWorkEndHour > 19 || randomWorkEndHour < randomWorkStartHour){
             randomWorkEndHour = randomWorkStartHour * Math.random()*10;
        }

        if(randomWorkStartHour == randomWorkEndHour ) {
            while(randomWorkStartMinute > randomWorkEndMinute || randomWorkEndMinute > 60 ){
                randomWorkEndMinute = randomWorkStartMinute + Math.random()*60;
            }
        }

 
        let taskTemplate = Object.values(Task.getTaskTypes())[(Math.random()*9).toFixed(0)];

        var urgency = ['low', 'medium', 'high'];

        var customerAmount = ((Math.random()*20)+1).toFixed(0);

        var store = Task.getStores()[(Math.random()*7).toFixed(0)];

        let testTask = new Task('', taskTemplate.description, randomEndDate, randomStartDate, taskTemplate.title, taskTemplate.title, 'employee', null , true, 'manager', true, false, randomWorkStart, randomWorkEnd, randomStartDate, urgency[Math.random()*2], customerAmount, store)

        console.log(testTask);

        this.taskService.createTask(testTask);

    }
}
