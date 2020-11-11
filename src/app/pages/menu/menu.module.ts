import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MenuPage} from './menu.page';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
    {
        path: '',
        component: MenuPage,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin},
        children:
            [
                {path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardPageModule'},
                {path: 'credits', loadChildren: '../credits/credits.module#CreditsPageModule'},
                {path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule'},
                {
                    path: 'initial-setup',
                    loadChildren: () => import('../initial-setup/initial-setup.module').then(m => m.InitialSetupPageModule)
                },
            ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [MenuPage]
})
export class MenuPageModule {
}
