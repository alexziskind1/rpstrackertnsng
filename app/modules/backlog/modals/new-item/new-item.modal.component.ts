import { Component } from '@angular/core';

import { ModalDialogParams } from 'nativescript-angular';
import { Page } from 'ui/page';
import { DatePicker } from 'ui/date-picker';
import { PtBaseModalComponent } from '../../../../shared/modals/pt-base.modal.component';
import { PtNewItemForm } from '../../../../shared/models/forms';
import { PtNewItem } from '../../../../shared/models/dto';
import { PtItemType } from '../../../../shared/models/domain/types';


@Component({
    moduleId: module.id,
    selector: 'pt-new-item-modal',
    templateUrl: 'new-item.modal.component.html'
})
export class NewItemModalComponent extends PtBaseModalComponent<string, PtNewItem> {

    constructor(
        params: ModalDialogParams,
        page: Page
    ) {
        super(params, page);
    }

    public onFormSaved(newItemForm: PtNewItemForm) {
        const newItem: PtNewItem = {
            title: newItemForm.title,
            description: newItemForm.description,
            type: <PtItemType>newItemForm.typeStr
        };

        this.closeCallback(newItem);
    }

    public onFormCancelled(): void {
        this.closeCallback(this.modalContext.defaultResult);
    }
}
