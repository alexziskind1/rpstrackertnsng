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
import { PtLoginModel, PtAuthToken, PtRegisterModel } from '../../shared/models';
import { Store } from '../app-store';
import { AppConfig, APP_CONFIG } from '../../app-config.module';
import { ErrorHandlerService } from './error-handler.service';

const AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY';

@Injectable()
export class AuthService {

    private get loginUrl() { return `${this.config.apiEndpoint}/auth`; }
    private get registerUrl() { return `${this.config.apiEndpoint}/register`; }

    get token(): PtAuthToken {
        const t = this.storageService.getItem(AUTH_TOKEN_KEY);
        return JSON.parse(t);
    }

    set token(authToken: PtAuthToken) {
        this.storageService.setItem(AUTH_TOKEN_KEY, JSON.stringify(authToken));
    }

    constructor(
        @Inject(APP_CONFIG) private config: AppConfig,
        private http: Http,
        private store: Store,
        private storageService: StorageService,
        private errorHandlerService: ErrorHandlerService
    ) { }

    public isLoggedIn(): boolean {
        return (!!this.storageService.getItem(AUTH_TOKEN_KEY)) && (!!this.store.value.currentUser);
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
        this.storageService.setItem(AUTH_TOKEN_KEY, '');
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
                this.store.set<PtUser>('currentUser', data.user);
                this.token = data.authToken;
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
                this.store.set<PtUser>('currentUser', data.user);
                this.token = data.authToken;
            })
            .catch(this.errorHandlerService.handleHttpError);
    }

}
