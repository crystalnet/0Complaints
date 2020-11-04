import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {AngularFireDatabase} from '@angular/fire/database';

import {Shift} from '../../model/shift';
//import {ShiftPart} from '../../model/shiftpart';
//import {ShiftPreference} from '../../model/shiftpreference';


@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  constructor(private fireDatabase: AngularFireDatabase) { }


//Do not change a shift, rather create new one and alter the old one.


/*
create a new shift
*/
createShift(shift: Shift){

  return new Promise<any>((resolve, reject) => {
    const id = firebase.database().ref().child('shift').child('shift').push().key;
    shift.id = id;

    this.fireDatabase.database.ref('/shift/shift').child(id)
        .set(shift.toFirebaseObject()).then(
        // Returns the information with the new id
        () => resolve(shift),
        err => reject(err)
    );
});

}

addAnyShiftParticipant(shift: Shift, userID: string){

  const promises = [];

    promises.push(this.fireDatabase.database.ref('/shift/shift/' + shift.id).child('participants')
          .child(userID).set(userID));

    promises.push(this.fireDatabase.database.ref('/users/' + userID).child('activeShifts')
    .child(shift.id).set(shift.id));

    return Promise.all(promises);

}

addShiftPreference(shift: Shift,userID: string){

  const promises = [];
      
  promises.push(this.fireDatabase.database.ref('/shift/shift/' + shift.id).child('preferenceList')
          .child(firebase.auth().currentUser.uid).set(firebase.auth().currentUser.uid));

  promises.push(this.fireDatabase.database.ref('/users/' + userID).child('perferenceShifts')
          .child(shift.id).set(shift.id));

  return Promise.all(promises);

}

acceptShiftPreference(shift: Shift, userID: string) {

  const promises = [];
      
  promises.push(this.fireDatabase.database.ref('/shift/shift/' + shift.id).child('participants')
          .child(firebase.auth().currentUser.uid).set(firebase.auth().currentUser.uid));

  promises.push(this.fireDatabase.database.ref('/shift/shift/' + shift.id).child('preferenceList')
          .child(firebase.auth().currentUser.uid).remove());

  promises.push(this.fireDatabase.database.ref('/users/' + userID).child('activeShifts')
          .child(shift.id).set(shift.id));

  promises.push(this.fireDatabase.database.ref('/users/' + userID).child('preferenceList')
          .child(shift.id).remove());

  return Promise.all(promises);

}

declineShiftPreference(shift: Shift, userID: string) {

  const promises = [];

  promises.push(this.fireDatabase.database.ref('/shift/shift/' + shift.id).child('preferenceList')
          .child(firebase.auth().currentUser.uid).remove());

  promises.push(this.fireDatabase.database.ref('/users/' + userID).child('preferenceList')
          .child(shift.id).remove());

  return Promise.all(promises);

}


/**
 * everything below is for more sophisticated methods, for now (see beyond) we use only userID's as participants and userID's as participants
 * @param shiftPart 
 
createShiftPart(shiftPart: ShiftPart){


        return new Promise<any>((resolve, reject) => {
          const id = firebase.database().ref().child('shift').child('shiftPart').push().key;
          shiftPart.id = id;

          this.fireDatabase.database.ref('/shift/shiftPart').child(id)
              .set(shiftPart.toFirebaseObject()).then(
              // Returns the information with the new id
              () => resolve(shiftPart),
              err => reject(err)
          );

      });
}

createShiftPreference(shiftPreference: ShiftPreference){

  
  return new Promise<any>((resolve, reject) => {
    const id = firebase.database().ref().child('shift').child('shiftPreference').push().key;
    shiftPreference.id = id;

    this.fireDatabase.database.ref('/shift/shiftPreference').child(id)
        .set(shiftPreference.toFirebaseObject()).then(
        // Returns the information with the new id
        () => resolve(shiftPreference),
        err => reject(err)
    );

});

}

cancelShiftPreference(shiftPreference: ShiftPreference){

}

cancelShift(shift: Shift){
  
}

cancelShiftPart(shiftPart: Shift){

}

*/

getAllActiveShiftsFromAllUsers(){

}

getAllActiveShiftsFromOneUser(user: string){

}

}
