import { Component } from '@angular/core';

import { ModalDialogParams } from 'nativescript-angular';
import { Page } from 'ui/page';

import { PtModalComponentBase } from '../pt-modal-component-base';

@Component({
    moduleId: module.id,
    selector: 'pt-text-input-modal',
    templateUrl: 'text-input.modal.component.html'
})
export class TextInputModalComponent extends PtModalComponentBase<string, string> {
    private originalText: string;
    public theText: string;

    constructor(
        params: ModalDialogParams,
        page: Page
    ) {
        super(params, page);
        this.originalText = this.modalContext.payload;
        this.theText = this.modalContext.payload;
    }

    public onModalSubmit() {
        this.closeCallback(this.theText);
    }

    public onCancelButtonTap(): void {
        this.closeCallback(this.originalText);
    }
}
