import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ErrorHandlerService {

    constructor() { }

    public handleHttpError(error: any) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
