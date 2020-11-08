interface FireBaseObject {
    id: string;
    description: string;
    endTime: string;
    startTime: string;
    createdAt: string;
    type: string;
    creator: string;
    group: string;
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
    constructor(id?: string, description?: string, endTime?: Date, startTime?: Date, title?: string, type?: string, creator?: string,
                group?: string, finished?: boolean, assignee?: string, done?: boolean, active?: boolean, workStart?: Date, workEnd?: Date,
                createdAt?: Date) {
        // Each parameter is optional, if it's not there, set the default value
        this.id = id || '';
        this.description = description || '';
        this.endTime = endTime || new Date();
        this.startTime = startTime || new Date();
        this.title = title || '';
        this.type = type || Object.keys(Task.types)[0];
        this.creator = creator || '';
        this.group = group || '';
        this.done = done || false;
        this.finished = finished || false;
        this.assignee = assignee || 'not assigned';
        this.active = active || false;
        this.workStart = workStart || new Date(0);
        this.workEnd = workEnd || new Date(0);
        this.createdAt = createdAt || new Date();
    }

    static types = {
        'accept-delivery': {
            title: 'accept delivery',
            description: 'Be at the drive in to accept the delivery. Sign the form and show the deliverant where to place the goods.'
        },
        cashier: {
            title: 'cashier',
            description: 'Be the cashier'
        },
        'stock-shelves': {
            title: 'Stock shelves',
            description: 'Stock the shelves in hallway X'
        }
    };
    id: string;
    description: string;
    endTime: Date;
    startTime: Date;
    title: string;
    type: string;
    creator: string;
    group: string;
    done: boolean;
    finished: boolean;
    assignee: string;
    active: boolean;
    workStart: Date;
    workEnd: Date;
    createdAt: Date;

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
            firebaseObject.type || '',
            firebaseObject.creator || '',
            firebaseObject.group || '',
            firebaseObject.finished,
            firebaseObject.assignee,
            firebaseObject.done,
            firebaseObject.active,
            new Date(firebaseObject.workStart) || new Date(),
            new Date(firebaseObject.workEnd) || new Date(),
            new Date(firebaseObject.createdAt) || new Date()
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
            createdAt: this.createdAt.getTime(),
            title: this.title,
            type: this.type,
            creator: this.creator,
            group: this.group,
            finished: this.finished,
            done: this.done,
            assignee: this.assignee,
            active: this.active,
            workStart: this.workStart.getTime(),
            workEnd: this.workEnd.getTime()
        };

    }
}
