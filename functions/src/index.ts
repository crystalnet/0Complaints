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
        id: new Date().getTime().toString(),
        description: '',
        endTime: moment().format('YYYY-MM-DD hh:mm:ss'),
        startTime: moment().format('YYYY-MM-DD hh:mm:ss'),
        createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
        urgency: 'medium',
        type: 'cashier',
        creator: 'Y53gqbvQKCUe3Z1sofNfxYyEjUH3',
        group: '-MKarNrhqogt3h3PQaZB',
        done: false,
        finished: false,
        title: 'New Task',
        registered: 0,
        assignee: 'not assigned',
        active: false,
        workStart: 0,
        workEnd: 0,
        customerAmount: 0,
        store: 'Mannheim',
    };
    if (data.title) {
        task.title = data.title;
    }
    if (data.description) {
        task.description = data.description;
    }
    if (data.type) {
        task.type = data.type;
    }
    console.log(task);

    admin.database().ref('/tasks/' + task.group).push(task).catch(
        (err: any) => console.log(err)
    );
});

