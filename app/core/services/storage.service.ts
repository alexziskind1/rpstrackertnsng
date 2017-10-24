import { Injectable } from '@angular/core';

@Injectable()
export abstract class StorageService {

    constructor() {
        console.log('constructing base StorageService');
    }

    abstract setItem(key: string, value: string | number): void;

    abstract getItem(key: string): string;

    abstract removeItem(key: string): void;

    abstract key(keyIndex: number): string;

    abstract clear(): void;

}
