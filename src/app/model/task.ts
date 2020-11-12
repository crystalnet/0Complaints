import * as moment from 'moment';

interface FireBaseObject {
    id: string;
    description: string;
    endTime: string;
    startTime: string;
    createdAt: string;
    urgency: string;
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
    customerAmount: number;
    store: string;
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
                createdAt?: Date, urgency?: string, customerAmount?: number, store?: string) {
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
        this.urgency = urgency || 'medium';
        this.customerAmount = customerAmount || 0;
        this.store = store || 'Mannheim';
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
        },
        'customer-complaint': {
            title: 'Customer complaint',
            description: 'deal with customer complaint at hallway X'
        },
        'delivery-quality-check': {
            title: 'Qualitycheck of delivered goods',
            description: 'Check the quality of delivered goods'
        },
        'write-supplier-complaint': {
            title: 'Complaint to supplier',
            description: 'Write the complaint to supplier X because of inferior quality goods'
        },
        'full-deposit-machine': {
            title: 'Full deposit machine',
            description: 'The deposit machine is almost full, empty it'
        },
        'clean-floor': {
            title: 'Floor is dirty',
            description: 'The floor at hallway X is dirty, please clean it for safety'
        },
        'change-price-tag': {
            title: 'The price tag is outdated',
            description: 'For product X a new price tag is available, please change it'
        },
        'check-expiration-date': {
            title: 'Date might expired',
            description: 'Check expiration date for product X'
        }

    };

    static urgencies = ['low', 'medium', 'high'];

    static stores = ['Frankfurt', 'Mannheim', 'Berlin', 'Muenchen', 'Hamburg', 'Koeln', 'Stuttgart', 'Freiburg'];

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
    urgency: string;
    customerAmount: number;
    store: string;

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
            new Date(firebaseObject.createdAt) || new Date(),
            firebaseObject.urgency,
            firebaseObject.customerAmount,
            firebaseObject.store
        );
    }

    static getTaskTypes() {
        return this.types;
    }

    static getStores() {
        return this.stores;
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
            endTime: moment(this.endTime).format('YYYY-MM-DD hh:mm:ss'),
            startTime: moment(this.startTime).format('YYYY-MM-DD hh:mm:ss'),
            title: this.title,
            type: this.type,
            creator: this.creator,
            group: this.group,
            finished: this.finished,
            done: this.done,
            assignee: this.assignee,
            active: this.active,
            workStart: moment(this.workStart).format('YYYY-MM-DD hh:mm:ss'),
            workEnd: moment(this.workEnd).format('YYYY-MM-YY hh:mm:ss'),
            createdAt: moment(this.createdAt).format('YYYY-MM-YY hh:mm:ss'),
            urgency: this.urgency,
            customerAmount: this.customerAmount,
            store: this.store
        };

    }
}
