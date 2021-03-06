import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {
    AngularFireAuthGuard,
    hasCustomClaim,
    redirectLoggedInTo,
    redirectUnauthorizedTo
} from '@angular/fire/auth-guard';

const adminOnly = () => hasCustomClaim('admin');
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['menu/dashboard']);

const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectLoggedInToDashboard}
    },
    {
        path: 'registration',
        loadChildren: './pages/registration/registration.module#RegistrationPageModule',
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectLoggedInToDashboard}
    },
    {
        path: 'terms', loadChildren: './pages/terms/terms.module#TermsPageModule'
    },
    {
        path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule', canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin}
    },
    {
        path: 'admin-dashboard',
        loadChildren: './pages/admin-dashboard/admin-dashboard.module#AdminDashboardPageModule',
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin}
    },
    {
        path: 'admin-dashboard-notifications',
        loadChildren: './pages/admin-dashboard-notifications/admin-dashboard-notifications.module#AdminDashboardNotificationsPageModule',
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin}
    },
    {
        path: 'shift',
        loadChildren: () => import('./pages/shift/shift/shift.module').then(m => m.ShiftPageModule)
    },
    {
        path: 'admin-dashboard-shift',
        loadChildren: () => import('./pages/admin-dashboard-shift/admin-dashboard-shift/admin-dashboard-shift.module').then(m => m.AdminDashboardShiftPageModule)
    },
    {
        path: 'admin-dashboard-analytics',
        loadChildren: () => import('./pages/admin-dashboard-analytics/admin-dashboard-analytics.module').then(m => m.AdminDashboardAnalyticsPageModule)
    }


    // { path: 'admin-dashboard', loadChildren: './pages/<path-to-admin-dashboard>', canActivate: [AngularFireAuthGuard],
    //     data: {authGuardPipe: adminOnly} }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
