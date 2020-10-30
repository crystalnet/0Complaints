//import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const moment = require('moment-timezone');

const functions = require('firebase-functions');

const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.sendNotification = functions.https.onCall((data: any, context: any) => {
    // Message text passed from the client.
    const token = data.token;
    const uid = data.uid;
    const title = data.title || 'You reached your goal!';
    const body = data.body || 'Congratulations - you reached your goal!';
    const id = data.id || (new Date()).getTime();
    const type = data.type || 'custom-notification';
    const target = data.target || '';
    const confirmButtonText = data.confirmButtonText || 'Nice';
    const rejectButtonText = data.rejectButtonText || 'Dismiss';
    // Authentication / user information is automatically added to the request.
    // const uid = context.auth.uid;
    // const name = context.auth.token.name || null;
    // const picture = context.auth.token.picture || null;
    // const email = context.auth.token.email || null;

    const payload_data = {
        header: title,
        text: body,
        type: type,
        id: id,
        target: target,
        confirmButtonText: confirmButtonText,
        rejectButtonText: rejectButtonText
    };

    const notification = new UserNotification(uid, payload_data, token);
    return notification.send();
});


class NotificationData {
    header: string;
    text: string;
    type: string;
    id: string;
    target: string;
    confirmButtonText: string;
    rejectButtonText: string;

    constructor(header?: string, text?: string, type?: string, id?: string, target?: string, confirmButtonText?: string,
                rejectButtonText?: string) {
        this.header = header || 'New Notification';
        this.text = text || 'Lorem ipsum dolor sit amet.';
        this.id = id || moment().tz('Europe/Berlin').valueOf().toString();
        this.type = type || '';
        this.target = target || '';
        this.confirmButtonText = confirmButtonText || 'Nice';
        this.rejectButtonText = rejectButtonText || 'Dismiss';
    }
}

class UserNotification {
    uid: string;
    title: string;
    body: string;
    sound: string;
    click_action: string;
    data: NotificationData;
    token: string;
    payload: object;

    constructor(uid: string, data?: NotificationData, token?: string) {
        this.uid = uid;
        this.title = data ? data.header : 'New Notification';
        this.body = data ? data.text : 'Lorem ipsum dolor sit amet.';
        this.data = data || new NotificationData();
        this.sound = 'default';
        this.click_action = 'FCM_PLUGIN_ACTIVITY';
        this.token = token || '';
        this.payload = {};
    }

    getUserToken() {
        return new Promise((resolve, reject) => {
            admin.database().ref('/users/' + this.uid + '/token').once('value').then(
                (snapshot: any) => {
                    const result = snapshot.val();
                    console.log('retrieved token ', result, ' for uid ', this.uid);
                    this.token = result;
                    resolve(result);
                },
                (err: any) => {
                    console.log('could not retrieve token: ', err);
                    reject(err);
                }
            );
        });
    }

    generatePayload() {
        this.payload = {
            notification: {
                title: this.title,
                body: this.body,
                sound: this.sound,
                click_action: this.click_action
            },
            data: this.data
        };
        return this.payload;
    }

    createDbEntry() {
        const dbNotification = {
            type: 'push-notification',
            notificationType: this.data.type,
            time: this.data.id,
            response: 'not opened'
        };
        admin.database().ref('/tracking/' + this.uid + '/reactions/' + this.data.id).set(dbNotification).catch(
            (err: any) => console.log(err)
        );
    }

    send() {
        if (!this.uid) {
            console.log('No uid set: ', this.token);
            return;
        }

        let promise: any = Promise.resolve(this.token);
        if (!this.token) {
            promise = this.getUserToken();
        }

        return promise.then(
            (token: any) => {
                if (!token) {
                    console.log('Notification was not send because there is no token');
                    return;
                } else {
                    this.generatePayload();
                    this.createDbEntry();

                    return admin.messaging().sendToDevice(token, this.payload)
                        .then((response: any) => {
                            console.log('Successfully sent message to ' + this.uid);
                        })
                        .catch(function(error: any) {
                            console.log('Error sending message:', error);
                        });
                }

            },
            (err: any) => console.log(err)
        );
    }
}

