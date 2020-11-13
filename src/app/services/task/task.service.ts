import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {Task} from '../../model/task';

import {ChallengesArray} from '../../model/challengesArray';

import {map, take} from 'rxjs/operators';
import {merge, of} from 'rxjs';
import {UserService} from '../user/user.service';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    constructor(private fireDatabase: AngularFireDatabase, private userService: UserService) {
        this.userService.getUser().subscribe(user => {
            this.group = user.group;
        });
    }

    group: string;

    /**
     * Creates a new task in firebase from an activity objects
     *
     * @param task an existing task object
     */
    createTask(task: Task) {
        return new Promise<any>((resolve, reject) => {
            const id = firebase.database().ref().child('tasks/' + this.group).push().key;
            task.id = id;
            task.creator = this.userService.getUid();
            task.group = this.group;
            this.fireDatabase.database.ref('/tasks/' + this.group).child(id)
                .set(task.toFirebaseObject()).then(
                // Returns the information with the new id
                () => resolve(task),
                err => reject(err)
            );
        });
    }

    editTask(task: Task) {
        console.log(task);
        return firebase.database().ref('/tasks/' + this.group + '/' + task.id).set(task.toFirebaseObject());
    }

    /**
     * this is needed to initially get all available tasks
     */
    getAllAvailableTasks(group) {
        const ref = this.fireDatabase.list<any>('/tasks/' + group, fn => fn.limitToLast(15));
        return ref.snapshotChanges().pipe(map(task => task.map(
            taskSnapshot => Task.fromFirebaseObject(taskSnapshot.key, taskSnapshot.payload.val()))));
    }

    /**
     * this is needed to initially get all available tasks
     */
    getAllFinishedTasks(group) {
        const ref = this.fireDatabase.list<any>('/tasks_finished/' + group, fn => fn.limitToLast(15));
        return ref.snapshotChanges().pipe(map(task => task.map(
            taskSnapshot => Task.fromFirebaseObject(taskSnapshot.key, taskSnapshot.payload.val()))));
    }


    /**
     * this is necessary in order to get all own active tasks to sort it in the frontend then
     */
    getAllUserActiveTasks() {
        const ref = this.fireDatabase.list<string>('/users/' + firebase.auth().currentUser.uid + '/tasksActive');
        // Retrieve an array, but with its metadata. This is necesary to have the key available
        // An array of Goals is reconstructed using the fromFirebaseObject method
        return merge(of([]), ref.snapshotChanges().pipe(
            map(tasks => tasks.map(goalPayload => goalPayload.key))));
    }


    getAllTasks() {
        const ref = this.fireDatabase.list<any>('/tasks/' + this.group);
        // Retrieve an array, but with its metadata. This is necesary to have the key available
        // An array of Goals is reconstructed using the fromFirebaseObject method
        return ref.snapshotChanges().pipe(
            map(tasks => tasks.map(goalPayload => (Task.fromFirebaseObject(goalPayload.key, goalPayload.payload.val())))));
    }

    getListOfAllUserAndTheirWonTasks() {
        const ref = this.fireDatabase.list<ChallengesArray>('/tasksStatus/');
        // Retrieve an array, but with its metadata. This is necesary to have the key available
        // An array of Goals is reconstructed using the fromFirebaseObject method
        return ref.snapshotChanges().pipe(
            map(user => user.map(
                taskpayload => (ChallengesArray.fromFirebaseObject(taskpayload.key, taskpayload.payload.val())))));
    }


    /**
     * this method adds the task to the users array which is necessary to determine the participated tasks
     * @param task identify the specific task which the user wants to participate
     */
    addTaskToActive(task: Task) {
        return new Promise<any>((resolve, reject) => {
            this.fireDatabase.database.ref('/users/' + firebase.auth().currentUser.uid).child('tasksActive')
                .child(task.id).set('true').then(
                res => resolve(res),
                err => reject(err)
            );
        });
    }

    removeTaskFromActive(task: Task) {
        return new Promise<any>((resolve, reject) => {
            this.fireDatabase.database.ref('/users/' + firebase.auth().currentUser.uid).child('tasksActive')
                .child(task.id).remove().then(
                res => resolve(res),
                err => reject(err)
            );
        });
    }

    /**
     * finish the task, this method is called from the admin dashboard in order to disable further registration
     * @param task identify the task
     */
    finishTask(task: Task) {
        return new Promise<any>((resolve, reject) => {
            this.fireDatabase.database.ref('/tasks/' + this.group + '/' + task.id).remove();
            task.finished = true;
            this.fireDatabase.database.ref('/tasks_finished/' + this.group + '/' + task.id).set(task.toFirebaseObject()).then(
                res => resolve(res),
                err => reject(err)
            );
        });
    }

    /**
     * Complete the task, this method is called from the admin dashboard in order to disable further registration
     * @param task which was completed
     */
    completeTask(task: Task) {
        if (!task.workStart) {
            task.workStart = new Date();
        }
        task.active = false;
        task.workEnd = new Date();
        task.done = true;
        return this.editTask(task);
    }

    /**
     * Assign the task to an employee
     * @param task the task to be assigned
     * @param uid the uid of the user to assign the task to
     */
    assign(task: Task, uid: string) {
        return new Promise<any>((resolve, reject) => {
            this.fireDatabase.database.ref('/tasks/' + this.group + '/' + task.id).child('assignee')
                .set(uid).then(
                res => resolve(res),
                err => reject(err)
            );
        });
    }

    /**
     * Start working on the task
     * @param task the task to be started
     */
    startTask(task: Task) {
        task.active = true;
        task.workStart = new Date();
        return this.editTask(task);
    }
}
