import { Routes } from '@angular/router';
import { LogInComponent } from './login/login.component';
import { LogInService, resolveUser } from './services/login.service';
import { AuthGuard } from './authGuard/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

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
        //providers: [LogInService],
        loadComponent: () => import('./homepage-org/homepage-org.component').then(mod => mod.HomepageOrgComponent), 
        canActivate: [AuthGuard],
        resolve: { userFromPath: resolveUser},
        title: 'Trenuci za pamcenje - Pocetna' 
    },
    {
        path: 'kupac/:userName',
        //providers: [LogInService],
        loadComponent: () => import('./homepage-kupac/homepage-kupac.component').then(mod => mod.HomepageKupacComponent), 
        canActivate: [AuthGuard],
        resolve: { userFromPath: resolveUser},
        title: 'Trenuci za pamcenje - Pocetna' 
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
