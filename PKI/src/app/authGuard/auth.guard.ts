import { inject, Injectable, Input } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, ResolveFn, Router } from '@angular/router';
import { LogInService } from '../services/login.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private logInService: LogInService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const user = sessionStorage.getItem('user'); // Check if user exists in session storage
    const userFromPath = route.params['userName'];
    if (user) {      
      if (this.logInService.getUser(user)?.userName === userFromPath){
        return true;
      } else {
        this.router.navigate(['/unauthorized']); // Redirect if unauthorized
        return false;
      }
    } else {
      this.router.navigate(['/login']); // Redirect to login page
      return false; // Deny access
    }
  }
}

