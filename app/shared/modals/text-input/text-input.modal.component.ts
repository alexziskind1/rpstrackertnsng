import { Component } from '@angular/core';

import { ModalDialogParams } from 'nativescript-angular';
import { Page } from 'ui/page';

import { PtModalComponentBase } from '../pt-modal-component-base';

@Component({
    moduleId: module.id,
    selector: 'pt-text-input-modal',
    templateUrl: 'text-input.modal.component.html',
    styleUrls: ['text-input.modal.component.css']
})
export class TextInputModalComponent extends PtModalComponentBase<string, string> {

    public modalTitle: string;
    public theText: string;
    public okText: string;

    constructor(
        params: ModalDialogParams,
        page: Page
    ) {
        super(params, page);
        this.modalTitle = this.modalContext.title;
        this.theText = this.modalContext.payload;
        this.okText = this.modalContext.btnOkText;
    }

    public onOkButtonTap() {
        this.closeCallback(this.theText);
    }

    public onCancelButtonTap(): void {
        this.closeCallback(this.modalContext.payload);
    }
}
