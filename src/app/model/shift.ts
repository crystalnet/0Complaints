interface FireBaseObject {
    id: string;
    description: string;
    endTime: string;
    startTime: string;
    participants: Array<object>;
    preferenceList: Array<object>;
    tasks: Array<object>;
}

export class Shift {
    /**
     * Constructor to create a Shift
     *
     * Each parameter is optional. If it's not present, a default value is used
     *
     */
    constructor(id?: string, description?: string, endTime?: Date, startTime?: Date, participants?: Array<object>, preferenceList?: Array<object>, tasks?: Array<object>,
                done?: boolean) {
        // Each parameter is optional, if it's not there, set the default value
        this.id = id || '';
        this.description = description || '';
        this.endTime = endTime || new Date();
        this.startTime = startTime || new Date();
        this.participants = participants || [];
        this.preferenceList = preferenceList || [];
        this.tasks = tasks|| [];
    }

    static types = ['running', 'swimming', 'workout'];
    static intensities = ['moderate', 'vigorous', 'weight training'];
    id: string;
    description: string;
    endTime: Date;
    startTime: Date;
    participants: Array<object>;
    preferenceList: Array<object>;
    tasks: Array<object>;

    /**
     * Creates an Shift object from a firebase query
     *
     * This basically reconstructs the dates from the date strings
     *
     * @param id id of the challenge
     * @param firebaseObject result of the query
     */
    static fromFirebaseObject(id: string, firebaseObject: FireBaseObject) {
        return new Shift(
            id || '',
            firebaseObject.description || '',
            new Date(firebaseObject.endTime) || new Date(),
            new Date(firebaseObject.startTime) || new Date(),
            firebaseObject.participants || [],
            firebaseObject.preferenceList || [],
            firebaseObject.tasks || []
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
            preferenceList: this.preferenceList,
            participants: this.participants,
            tasks: this.tasks
        };

    }
}
