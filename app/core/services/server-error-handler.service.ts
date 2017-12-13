import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServerErrorHandlerService {

    constructor() { }

    public handleHttpError(error: any) {
        return Observable.throw(error.json().error || 'Server error');
        //throw new Error('Server Error: ' + error.json().error || 'Something went wrong');
    }

}