interface FireBaseObject {
    id: string;
    name: string;
    group: string;
    type: string;
    profilePictureUrl: string;
    token: string;
}

export class User {

    /**
     * Constructor to create User object
     *
     * Each parameter is optional. If it's not present, a default value is used
     *
     */
    constructor(id?: string, name?: string, group?: string, type?: string, profilePictureUrl?: string) {
        // Each parameter is optional, if it's not there, set the default value
        this.id = id || '-1';
        this.name = name || 'No username';
        this.group = group || '-1';
        this.type = type || 'user';
        this.profilePictureUrl = profilePictureUrl || '';
    }

    id: string;
    name: string;
    group: string;
    type: string;
    profilePictureUrl: string;
    token: string;

    static fromFirebaseObject(id: string, firebaseObject: FireBaseObject) {
        return new User(
            id || '',
            firebaseObject.name || 'Test Account',
            firebaseObject.group || '-1',
            firebaseObject.type || '',
            firebaseObject.profilePictureUrl || '',
        );
    }

    /**
     * toFireBaseObject
     *
     * Converts the User object to a firebase object. It basically just replaces the arrays with a JSON string.
     * We could also hand over the whole user object to firebase, but then it would use the arrays as subelements.
     * If we substitute the arrays with their string representation, firebase will just store them as a string as well
     * and not try to parse them.
     *
     */
    toFirebaseObject() {
        const offset = new Date().getTimezoneOffset();
        return {
            name: this.name,
            group: this.group,
            type: this.type,
            profilePictureUrl: this.profilePictureUrl,
            offset
        };
    }

    toPublicUserData() {
        return {
            name: this.name,
            profilePictureUrl: this.profilePictureUrl,
        };
    }
}
