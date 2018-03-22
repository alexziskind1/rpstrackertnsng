
import { AuthService } from './auth.service';

import { AuthTokenService } from './auth-token.service';
import { LoggerService } from './logger.service';
import { NavigationService } from './navigation.service';
import { PtUserService } from './pt-user.service';
import { ServerErrorHandlerService } from './server-error-handler.service';
// import { StorageService } from './storage.service';
import { StorageNsService } from './ns/storage-ns.service';
import { StorageWebService } from './web/storage-web.service';
// import {   PtApiHttpInterceptor} from './auth-interceptor.service';


export * from './auth-guard.service';
// export * from './auth-interceptor.service';
export * from './auth.service';
export * from './auth-token.service';
export * from './logger.service';
export * from './navigation.service';
export * from './pt-user.service';
export * from './server-error-handler.service';
// export * from './storage.service';
export * from './ns/storage-ns.service';
export * from './web/storage-web.service';

export const SERVICES = [
    AuthService,
    AuthTokenService,
    LoggerService,
    NavigationService,
    PtUserService,
    ServerErrorHandlerService,
    // StorageService,
    StorageNsService,
    StorageWebService,
    // PtApiHttpInterceptor
];

