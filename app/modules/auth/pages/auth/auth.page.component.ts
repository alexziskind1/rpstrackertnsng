import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { PageRoute } from 'nativescript-angular/router';

import { AuthService } from '../../../../core/services/auth.service';
import { NavigationService } from '../../../../core/services/navigation.service';
import { PtUser } from '../../../../shared/models/domain';
import { PtLoginModel, PtRegisterModel } from '../../../../shared/models/domain';

type AuthAction = 'login' | 'logout' | 'register';


@Component({
    moduleId: module.id,
    selector: 'app-auth-page',
    templateUrl: 'auth.page.component.html'
})
export class AuthPageComponent implements OnInit {

    public action: AuthAction;

    constructor(
        //private pageRoute: PageRoute,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private navigationService: NavigationService
    ) { }

    ngOnInit() {
        /*
        this.pageRoute.activatedRoute
            .switchMap(activatedRoute => activatedRoute.params)
            .subscribe((params) => {
                this.action = <AuthAction>params['action'];
                if (this.action === 'logout') {
                    this.logout();
                }
            });
            */

        this.activatedRoute.params.subscribe((params) => {
            this.action = <AuthAction>params['action'];
            if (this.action === 'logout') {
                this.logout();
            }
        });

    }

    public onLogin(loginModel: PtLoginModel) {
        this.authService.login(loginModel)
            .subscribe((user: PtUser) => {
                this.navigationService.navigate(['/backlog'], { clearHistory: true });
            });
    }

    public onRegister(registerModel: PtRegisterModel) {
        this.authService.register(registerModel)
            .subscribe((user: PtUser) => {
                this.navigationService.navigate(['/backlog'], { clearHistory: true });
            });
    }

    private logout() {
        this.authService.logout();
        this.navigationService.navigate(['/auth', 'login'], { clearHistory: true });
    }
}
