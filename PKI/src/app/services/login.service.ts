import { inject, Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { ActivatedRouteSnapshot, ResolveFn, Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class LogInService {
    private users: User[] = [];

    constructor(private router: Router) {
        this.users = [
            { userName: 'organizator123', password: '123456', kindOfUser: 'organizator', firstName: 'Pera', lastName: 'Peric', tel: '+38164529557', address: 'Neznanog junaka 26' },
            { userName: 'kupac123', password: '123456', kindOfUser: 'kupac', firstName: 'Mika', lastName: 'Mikic', tel: '+38164529557', address: 'Neznanog junaka 26' },
        ]
    }

    logIn(userName: string, password: string) {
        let user = this.users.find((user) => user.userName === userName && user.password === password);
        if (user) {
            sessionStorage.setItem('user', userName); // Save user data
            if (user.kindOfUser === 'organizator') {
                this.router.navigate(['organizator/' + userName]); 
            } else {
                this.router.navigate(['kupac/' + userName]); 
            }           
        }
        else {
            alert("Neispravno korisničko ime ili lozinka!")
        }
    }

    getUser(userName: string) {
        return this.users.find((user) => user.userName === userName);
    }
}
export const resolveUser: ResolveFn<User | undefined> = (activatedRoute: ActivatedRouteSnapshot) => {
    const loginService = inject(LogInService);
    const userFromPath = loginService.getUser(activatedRoute.paramMap.get('userName') || '');
  
    return userFromPath;
};