import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {AngularFireDatabase} from '@angular/fire/database';

import {Shift} from '../../model/shift';
import {ShiftPart} from '../../model/shiftpart';
import {ShiftPreference} from '../../model/shiftpreference';


@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  constructor(private fireDatabase: AngularFireDatabase) { }


//Do not change a shift, rather create new one and alter the old one.

createShift(shift: Shift){

}

createShiftPart(shiftPart: ShiftPart){

}

createShiftPreference(shiftPreference: ShiftPreference){

}

cancelShiftPreference(shiftPreference: ShiftPreference){

}

cancelShift(shift: Shift){
  
}

cancelShiftPart(shiftPart: Shift){

}

getAllActiveShiftsFromAllUsers(){

}

getAllActiveShiftsFromOneUser(user: string){

}

}
