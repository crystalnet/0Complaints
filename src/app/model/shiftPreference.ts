interface FireBaseObject {
    id: string;
    description: string;
    endTime: string;
    startTime: string;
    participant: string;
}

export class ShiftPreference {
    /**
     * Constructor to create a Shift
     *
     * Each parameter is optional. If it's not present, a default value is used
     *
     */
    constructor(id?: string, description?: string, endTime?: Date, startTime?: Date, participant?: string) {
        // Each parameter is optional, if it's not there, set the default value
        this.id = id || '';
        this.description = description || '';
        this.endTime = endTime || new Date();
        this.startTime = startTime || new Date();
        this.participant = participant || '';
    }

    static types = ['running', 'swimming', 'workout'];
    static intensities = ['moderate', 'vigorous', 'weight training'];
    id: string;
    description: string;
    endTime: Date;
    startTime: Date;
    participant: string;

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
            firebaseObject.participant || ''
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
            participant: this.participant
        };

    }
}
