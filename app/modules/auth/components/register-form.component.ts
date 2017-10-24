import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PtRegisterModel } from '../../../shared/models';


@Component({
    moduleId: module.id,
    selector: 'pt-register-form',
    templateUrl: 'register-form.component.html'
})
export class RegisterFormComponent implements OnInit {

    @Output() registerInitiated = new EventEmitter<PtRegisterModel>();

    public email: string;
    public password: string;
    public fullName: string;

    constructor() { }

    ngOnInit() { }

    public onRegisterTap(isValid: boolean) {
        if (isValid) {
            const registerModel: PtRegisterModel = {
                username: this.email,
                password: this.password,
                fullName: this.fullName
            };
            this.registerInitiated.emit(registerModel);
        }
    }
}
