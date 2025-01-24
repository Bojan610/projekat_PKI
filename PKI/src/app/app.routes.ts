import { Routes } from '@angular/router';
import { LogInComponent } from './login/login.component';
import { LogInService } from './services/login.service';
import { AuthGuard } from './authGuard/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { OrganizatorService } from './services/organizator.service';
import { LogoutComponent } from './logout/logout.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LogInComponent,
        title: 'Trenuci za pamcenje - Prijava' 
    },
    {
        path: 'organizator/:userName',
        loadComponent: () => import('./organizator/organizator.component').then(mod => mod.OrganizatorComponent),
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'prefix'

            },
            {
                path: 'home',         
                loadComponent: () => import('./homepage-org/homepage-org.component').then(mod => mod.HomepageOrgComponent), 
                canActivate: [AuthGuard],
                title: 'Trenuci za pamcenje - Pocetna'
            },
            {
                path: 'mojprofil',      
                loadComponent: () => import('./my-profile/my-profile.component').then(mod => mod.MyProfileComponent),
                canActivate: [AuthGuard],
                title: 'Trenuci za pamcenje - Moj profil' 
            },
            {
                path: 'dogadjaji',     
                loadComponent: () => import('./events/events.component').then(mod => mod.EventsComponent),
                canActivate: [AuthGuard],
                title: 'Trenuci za pamcenje - Dogadjaji'
            },
            {
                path: 'rezervacije',     
                loadComponent: () => import('./reservations-organizator/reservations-organizator.component').then(mod => mod.ReservationsOrganizatorComponent),
                canActivate: [AuthGuard],
                title: 'Trenuci za pamcenje - Rezervacije'
            },
            {
                path: 'logout',
                component: LogoutComponent
            },
        ]
    },
    {
        path: 'kupac/:userName',
        loadComponent: () => import('./kupac/kupac.component').then(mod => mod.KupacComponent), 
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'prefix'

            },
            {
                path: 'home',         
                loadComponent: () => import('./homepage-kupac/homepage-kupac.component').then(mod => mod.HomepageKupacComponent), 
                canActivate: [AuthGuard],
                title: 'Trenuci za pamcenje - Pocetna'
            },
            {
                path: 'mojprofil',      
                loadComponent: () => import('./my-profile/my-profile.component').then(mod => mod.MyProfileComponent),
                canActivate: [AuthGuard],
                title: 'Trenuci za pamcenje - Moj profil' 
            },
            {
                path: 'dogadjaji',     
                loadComponent: () => import('./events-kupac/events-kupac.component').then(mod => mod.EventsKupacComponent),
                canActivate: [AuthGuard],
                title: 'Trenuci za pamcenje - Dogadjaji'
            },
            {
                path: 'korpa',     
                loadComponent: () => import('./cart/cart.component').then(mod => mod.CartComponent),
                canActivate: [AuthGuard],
                title: 'Trenuci za pamcenje - Korpa'
            },
            {
                path: 'mojerezervacije',     
                loadComponent: () => import('./reservations/reservations.component').then(mod => mod.ReservationsComponent),
                canActivate: [AuthGuard],
                title: 'Trenuci za pamcenje - Moje rezervacije'
            },
            {
                path: 'logout',
                component: LogoutComponent
            },
        ]
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent, 
        title: 'Trenuci za pamcenje - Unauthorized' 
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: 'Trenuci za pamcenje - Stranica nije pronadjena' 
    }
];
