import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/services/user/user.service';
import {Observable, of} from 'rxjs';
import {Task} from '../../model/task';
import {TaskService} from '../../services/task/task.service';
import {first, map, mergeMap} from 'rxjs/operators';

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

    group: Observable<string>;
    config: Observable<string>;
    selectedPath = '';
    leaderboardB = false;
    socialB = false;
    rewardsB = false;
    tasks: Observable<Task[]>;
    activeTasks: Task[];
    myTasks: Task[];
    completedTasks: Task[];
    otherTasks: Task[];

    constructor(private userService: UserService, private taskService: TaskService) {
        this.group = userService.getUsergroup();
        this.group.subscribe(group => this.updateGroup(group));
        this.tasks = taskService.getAllAvailableTasks().pipe(map(list => list.reverse()));
        this.tasks.subscribe((tasks: Task[]) => {
            this.activeTasks = [];
            this.myTasks = [];
            this.completedTasks = [];
            this.otherTasks = [];
            for (const task of tasks) {
                if (task.assignee === userService.getUid()) {

                    if (task.active) {
                        this.activeTasks.push(task);
                    } else if (task.done) {
                        this.completedTasks.push(task);
                    } else {
                        this.myTasks.push(task);
                    }
                } else if (!task.done) {
                    this.otherTasks.push(task);
                }
            }
        });
    }

    ngOnInit() {
    }

    /**
     * Update the group of the user
     *
     * This method updates the whole pages array when there is a new group available. This is necessary, because
     * Angular cannot detect changes in the elements of the array.
     *
     * @param group the new group
     */
    updateGroup(group) {
        // BK: as a test I delted for group 1 the rewards page
        this.config = this.userService.getGroupconfig(group);
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
