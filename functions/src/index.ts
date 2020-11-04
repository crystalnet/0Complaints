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
    console.log('Whehee');
    const task = {
        description: 'Lorem ipsum',
        endTime: new Date().getTime(),
        startTime: new Date().getTime(),
        title: 'Automatic Notification',
        finished: false,
        done: false,
        assignee: 'not assigned',
        active: false,
        workStart: 0,
        workEnd: 0
    };
    if (data.title) {
        task.title = data.title;
    }
    console.log(task);

    admin.database().ref('/tasks/').push(task).catch(
        (err: any) => console.log(err)
    );
});

