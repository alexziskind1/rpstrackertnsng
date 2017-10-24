import { Component } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular';
import { Page } from 'ui/page';
import { PtBaseModalComponent } from '../pt-base.modal.component';
import { PtModalListModel } from '../../models/ui/pt-modal-list.model';
import { PtModalListDisplayItem } from '../../models/ui/pt-modal-list-display-item.model';

@Component({
    moduleId: module.id,
    selector: 'pt-list-selector-modal',
    templateUrl: 'list-selector.modal.component.html',
    styleUrls: ['list-selector.modal.component.css']
})
export class ListSelectorModalComponent extends PtBaseModalComponent<PtModalListModel<PtModalListDisplayItem>, number> {
    public items: PtModalListDisplayItem[] = [];
    private originalSelectedIndex: number = 0;
    private selectedIndex: number = 0;
    private ptModalListModel: PtModalListModel<PtModalListDisplayItem>;

    constructor(
        params: ModalDialogParams,
        page: Page
    ) {
        super(params, page);
        var a = 0;
        this.ptModalListModel = this.modalContext.payload;
        if (this.ptModalListModel.selectedIndex) {
            this.originalSelectedIndex = this.ptModalListModel.selectedIndex;
            this.selectedIndex = this.ptModalListModel.selectedIndex;
        }

        for (let i = 0; i < this.ptModalListModel.items.length; i++) {
            this.items.push({
                title: this.ptModalListModel.items[i].title,
                value: this.ptModalListModel.items[i].value,
                img: this.ptModalListModel.items[i].img,
                isSelected: i === this.selectedIndex ? true : false
            });
        }
    }

    public onItemSelected(args): void {
        const oldSelectedItem = this.items[this.selectedIndex];
        oldSelectedItem.isSelected = false;

        const newSelectedItem = this.items[args.index];
        newSelectedItem.isSelected = true;
        this.selectedIndex = args.index;

        this.closeCallback(newSelectedItem.value);
    }

    public onCancelButtonTap(): void {
        this.closeCallback(this.modalContext.defaultResult);
    }
}
