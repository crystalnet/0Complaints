import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/services/user/user.service';
import {Observable, of} from 'rxjs';
import {Task} from '../../model/task';
import {TaskService} from '../../services/task/task.service';
import {filter, first, map, mergeMap} from 'rxjs/operators';

@Component({
    selector: 'app-dashboard-detail',
    templateUrl: './dashboard-detail.page.html',
    styleUrls: ['./dashboard-detail.page.scss'],
})
export class DashboardDetailPage implements OnInit {

    allServices = [];

    social = {
        label: 'Social Feed',
        routerLink: '/menu/socialfeed',
        image: './assets/socialfeed2.png'
    };

    leaderboard = {
        label: 'Leaderboard',
        routerLink: '/menu/leaderboard',
        image: './assets/leaderboard2.png'
    };

    rewards = {
        label: 'Rewards',
        routerLink: '/menu/rewards',
        image: './assets/rewards2.png'
    };

    config: Observable<string>;
    selectedPath = '';
    leaderboardB = false;
    socialB = false;
    rewardsB = false;
    tasks: Observable<Task[]>;
    activeTasks: Observable<Task[]>;
    myTasks: Observable<Task[]>;
    completedTasks: Observable<Task[]>;
    otherTasks: Observable<Task[]>;

    constructor(private userService: UserService, private taskService: TaskService) {
        console.log('asd');
        userService.getUsergroup().then(
            group => {
                console.log('asdfasdf' + group);
                this.tasks = taskService.getAllAvailableTasks(group).pipe(map(list => list.reverse()));
                this.activeTasks = this.tasks.pipe(map(tasks => tasks.filter(task => task.active && task.assignee === this.userService.getUid())));
                this.completedTasks = this.tasks.pipe(map(tasks => tasks.filter(task => task.done && task.assignee === this.userService.getUid())));
                this.myTasks = this.tasks.pipe(map(tasks => tasks.filter(task => !task.active && !task.done && task.assignee === this.userService.getUid())));
                this.otherTasks = this.tasks.pipe(map(tasks => tasks.filter(task => task.assignee !== this.userService.getUid())));
            }, err => console.log(err)
        );
    }

    ngOnInit() {
    }

    completeTask(task) {
        this.taskService.completeTask(task);
    }

    startTask(task) {
        this.taskService.startTask(task);
    }

    assign(task) {
        this.taskService.assign(task, this.userService.getUid());
    }

    getUser(uid) {
        return this.userService.getUserById(uid);
    }
}
