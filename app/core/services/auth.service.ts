import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';


//import { NSHttp as Http } from 'nativescript-angular/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { StorageService } from './storage.service';
import { PtUser } from '../../shared/models/domain';
import { PtLoginModel, PtAuthToken, PtRegisterModel } from '../../shared/models/domain';
import { Store } from '../app-store';
import { AppConfig, APP_CONFIG } from '../../app-config.module';
import { ErrorHandlerService } from './error-handler.service';

const AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY';
const CURRENT_USER_KEY = 'CURRENT_USER_KEY';

@Injectable()
export class AuthService {

    private get loginUrl() { return `${this.config.apiEndpoint}/auth`; }
    private get registerUrl() { return `${this.config.apiEndpoint}/register`; }

    get token(): PtAuthToken {
        return this.storageService.getItem<PtAuthToken>(AUTH_TOKEN_KEY);
    }

    set token(authToken: PtAuthToken) {
        this.storageService.setItem<PtAuthToken>(AUTH_TOKEN_KEY, authToken);
    }

    get currentUser(): PtUser {
        const user = this.storageService.getItem<PtUser>(CURRENT_USER_KEY);
        if (!this.store.value.currentUser && user) {
            this.store.set<PtUser>('currentUser', user);
        }
        return user;
    }

    set currentUser(ptUser: PtUser) {
        this.storageService.setItem<PtUser>(CURRENT_USER_KEY, ptUser);
        this.store.set<PtUser>('currentUser', ptUser);
    }

    constructor(
        @Inject(APP_CONFIG) private config: AppConfig,
        private http: Http,
        private store: Store,
        private storageService: StorageService,
        private errorHandlerService: ErrorHandlerService
    ) { }

    public isLoggedIn(): boolean {
        const hasToken = !!this.token;
        const hasCurrentUser = !!this.currentUser;
        return hasToken && hasCurrentUser;
    }

    public login(loginModel: PtLoginModel): Observable<PtUser> {
        this.loginInternal(loginModel)
            .subscribe();
        return this.store.select<PtUser>('currentUser');
    }

    public register(registerModel: PtRegisterModel): Observable<PtUser> {
        this.registerInternal(registerModel)
            .subscribe();
        return this.store.select<PtUser>('currentUser');
    }

    public logout() {
        this.storageService.setItem(AUTH_TOKEN_KEY, undefined);
        this.storageService.setItem(CURRENT_USER_KEY, undefined);
    }

    private loginInternal(loginModel: PtLoginModel) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(
            this.loginUrl,
            {
                loginModel: loginModel,
                grant_type: 'password'
            },
            { headers: headers }
        )
            .map(response => response.json())
            .do(data => {
                this.token = data.authToken;
                this.currentUser = data.user;
                //this.store.set<PtUser>('currentUser', data.user);
            })
            .catch(this.errorHandlerService.handleHttpError);
    }

    private registerInternal(registerModel: PtRegisterModel) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(
            this.registerUrl,
            { registerModel: registerModel },
            { headers: headers }
        )
            .map(response => response.json())
            .do(data => {
                this.token = data.authToken;
                this.currentUser = data.user;
                //this.store.set<PtUser>('currentUser', data.user);
            })
            .catch(this.errorHandlerService.handleHttpError);
    }

}
