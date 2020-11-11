import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';


import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {ReactiveFormsModule} from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/storage';

import {AuthenticateService} from './services/authentication/authentication.service';
import {AngularFireAuthGuardModule} from '@angular/fire/auth-guard';
import { Health } from '@ionic-native/health/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import {DatePipe} from '@angular/common';

const firebaseConfig = {
    apiKey: 'AIzaSyAbbpaQhoH_R7M3NVevSeWnjwZ8dLF4AS0',
    authDomain: 'c0mplaints.firebaseapp.com',
    databaseURL: 'https://c0mplaints.firebaseio.com',
    projectId: 'c0mplaints',
    storageBucket: 'c0mplaints.appspot.com',
    messagingSenderId: '523886203945',
    appId: '1:523886203945:web:2870799446dab9f4e73838',
    measurementId: 'G-60VHDCK3Z3'
};


@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule,
        ReactiveFormsModule,
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(firebaseConfig),
        AppRoutingModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        AngularFireAuthGuardModule,
        AngularFireStorageModule,
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
        AngularFireStorageModule, // imports firebase/storage only needed for storage features
        IonicStorageModule.forRoot() // used for saving data to device


    ],
    providers: [
        StatusBar,
        SplashScreen,
        AuthenticateService,
        Health,
        FCM,
        DatePipe,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
