interface FireBaseObject {
    id: string;
    description: string;
    endTime: string;
    startTime: string;
    done: boolean;
    finished: boolean;
    title: string;
    registered: number;
    assignee: string;
    active: boolean;
    workStart: string;
    workEnd: string;
}

export class Task {
    /**
     * Constructor to create Challenge
     *
     * Each parameter is optional. If it's not present, a default value is used
     *
     */
    constructor(id?: string, description?: string, endTime?: Date, startTime?: Date, title?: string, finished?: boolean, assignee?: string,
                done?: boolean, active?: boolean, workStart?: Date, workEnd?: Date) {
        // Each parameter is optional, if it's not there, set the default value
        this.id = id || '';
        this.description = description || '';
        this.endTime = endTime || new Date();
        this.startTime = startTime || new Date();
        this.title = title || '';
        this.done = done || false;
        this.finished = finished || false;
        this.assignee = assignee || 'not assigned';
        this.active = active || false;
        this.workStart = workStart || new Date(0);
        this.workEnd = workEnd || new Date(0);
    }

    id: string;
    description: string;
    endTime: Date;
    startTime: Date;
    title: string;
    done: boolean;
    finished: boolean;
    assignee: string;
    active: boolean;
    workStart: Date;
    workEnd: Date;

    /**
     * Creates an Challenge object from a firebase query
     *
     * This basically reconstructs the dates from the date strings
     *
     * @param id id of the challenge
     * @param firebaseObject result of the query
     */
    static fromFirebaseObject(id: string, firebaseObject: FireBaseObject) {
        return new Task(
            id || '',
            firebaseObject.description || '',
            new Date(firebaseObject.endTime) || new Date(),
            new Date(firebaseObject.startTime) || new Date(),
            firebaseObject.title || '',
            firebaseObject.finished,
            firebaseObject.assignee,
            firebaseObject.done,
            firebaseObject.active,
            new Date(firebaseObject.workStart) || new Date(),
            new Date(firebaseObject.workEnd) || new Date()
        );
    }

    /**
     * Converts the challenge to upload it to firebase
     *
     * Basically just replaces the dates with date strings
     */
    toFirebaseObject() {
        console.log(this.endTime);
        console.log(this.startTime);

        return {
            description: this.description,
            endTime: this.endTime.getTime(),
            startTime: this.startTime.getTime(),
            title: this.title,
            finished: this.finished,
            done: this.done,
            assignee: this.assignee,
            active: this.active,
            workStart: this.workStart.getTime(),
            workEnd: this.workEnd.getTime()
        };

    }
}
