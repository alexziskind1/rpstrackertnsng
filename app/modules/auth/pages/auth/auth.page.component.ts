import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PageRoute } from 'nativescript-angular/router';
import { Page } from 'ui/page';

import { AuthService } from '../../../../core/services/auth.service';
import { NavigationService } from '../../../../core/services/navigation.service';
import { PtUser } from '../../../../core/models/domain';
import { PtLoginModel, PtRegisterModel } from '../../../../core/models/domain';


type AuthAction = 'login' | 'logout' | 'register';


@Component({
    moduleId: module.id,
    selector: 'pt-auth-page',
    templateUrl: 'auth.page.component.html'
})
export class AuthPageComponent implements OnInit {

    public action: AuthAction;

    constructor(
        private page: Page,
        //private pageRoute: PageRoute,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private navigationService: NavigationService
    ) {
        this.page.backgroundSpanUnderStatusBar = true;
    }

    public ngOnInit() {
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