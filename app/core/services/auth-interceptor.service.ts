import { Injectable, Injector } from '@angular/core';

import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthTokenService } from './auth-token.service';

@Injectable()
export class PtApiHttpInterceptor implements HttpInterceptor {

    constructor(private authTokenService: AuthTokenService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        //This is only a simulation to demonstrate the use of a http interceptor
        const authToken = this.authTokenService.token.access_token;

        const authRequest = req.clone(
            {
                headers: req.headers.set(
                    'Authorization',
                    `token ${authToken}`
                )
            }
        );
        return next.handle(authRequest);
    }
}
