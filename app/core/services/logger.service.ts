import { Injectable } from '@angular/core';


@Injectable()
export class LoggerService {
    logs: string[] = [];
    errors: string[] = [];

    log(message: string) {
        this.logs.push(message);
        console.log(message);
    }

    error(message: string) {
        this.errors.push(message);
        console.error(message);
    }
}
