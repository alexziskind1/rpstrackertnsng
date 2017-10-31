import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    Route,
    RouterStateSnapshot
} from '@angular/router';

import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

import { RouterExtensions } from 'nativescript-angular/router';

import { AuthService } from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: RouterExtensions, private authService: AuthService) { }

    canActivate() {
        if (this.authService.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['/auth', 'login'], { clearHistory: true });
            return false;
        }
    }

}
