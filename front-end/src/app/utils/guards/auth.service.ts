import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/users';


@Injectable()
export class AuthService {

    private loggedIn = new BehaviorSubject<boolean>(false);

    private adminloggedIn = new BehaviorSubject<boolean>(false);

    constructor(private _router: Router) { }

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }
    get isadminloggedIn() {
        return this.adminloggedIn.asObservable();
    }

    login(user: User) {
        if (user.email !== '' && user.password !== '') {
            this.loggedIn.next(true);
            this.adminloggedIn.next(user.type === 'admin' ? true : false);
        }
    }
    logout() {
        this.loggedIn.next(false);
        this.adminloggedIn.next(false);
    }

}
