import { Component, OnInit } from '@angular/core';

import { ModalDialogParams } from 'nativescript-angular';
import { Page } from 'ui/page';
import { DatePicker } from 'ui/date-picker';

@Component({
    moduleId: module.id,
    selector: 'pt-text-input-modal',
    templateUrl: 'text-input.modal.component.html'
})
export class TextInputModalComponent implements OnInit {

    public theText: string;

    constructor(private params: ModalDialogParams, private page: Page) {
        this.page.on("unloaded", () => {
            // using the unloaded event to close the modal when there is user interaction
            // e.g. user taps outside the modal page
            this.params.closeCallback();
        });
    }

    public ngOnInit() {
        this.theText = this.params.context;
    }

    public onModalSubmit() {
        this.params.closeCallback(this.theText);
    }
}
