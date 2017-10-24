import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, ViewContainerRef } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

//import { ModalDialogOptions, ModalDialogService } from 'nativescript-angular';

import { PtItem } from '../../../../shared/models/domain';
import { TextInputModalComponent } from '../../../../shared/modals/text-input/text-input.modal.component';
import { PtModalService } from '../../../../shared/modals/pt-modal.service';
import { PtModalContext } from '../../../../shared/models/ui/pt-modal-context.model';
import { ItemTypeEnum } from '../../../../shared/enums';
import { PtModalListModel } from '../../../../shared/models/ui/pt-modal-list.model';
import { enumValueIndex } from '../../../../shared/enums/enum-util';
import { PtModalListDisplayItem } from '../../../../shared/models/ui/pt-modal-list-display-item.model';


type EditingPropType = 'title' | 'description';

@Component({
    moduleId: module.id,
    selector: 'pt-item-details',
    templateUrl: 'pt-item-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtItemDetailsComponent implements OnInit {

    @Input() public item: PtItem;
    @Output() itemSaved = new EventEmitter<PtItem>();

    constructor(
        //private modalService: ModalDialogService,
        private ptModalService: PtModalService,
        private vcRef: ViewContainerRef
    ) { }

    public ngOnInit() { }

    public onDialogSaveTap(args) {
        this.itemSaved.emit(this.item);
    }

    public onTitleTap(args) {
        const ctx = this.ptModalService.createPtModalContext(
            this.vcRef,
            'Edit title',
            this.item.title,
            this.item.title
        );
        this.ptModalService.createTextInputModal<string, string>(ctx)
            .then(result => {
                this.item.title = result;
                this.itemSaved.emit(this.item);
            }).catch(error => console.error(error));
    }


    public onDescriptionTap(args) {
        const ctx = this.ptModalService.createPtModalContext<string, string>(
            this.vcRef,
            'Edit description',
            this.item.description,
            this.item.description
        );
        this.ptModalService.createTextInputModal<string, string>(ctx)
            .then(result => {
                this.item.description = result;
                this.itemSaved.emit(this.item);
            }).catch(error => console.error(error));
    }

    public onItemTypeTap(args) {
        const ptModalListModel: PtModalListModel<PtModalListDisplayItem> = {
            items: this.ptModalService.enumToModalListDisplayItemArray(ItemTypeEnum),
            selectedIndex: enumValueIndex(this.item.type, ItemTypeEnum)
        };

        const ctx = this.ptModalService.createPtModalContext<PtModalListModel<PtModalListDisplayItem>, number>(
            this.vcRef,
            'Edit item type',
            ptModalListModel,
            this.item.type
        );
        this.ptModalService.createListSelectorModal<PtModalListModel<PtModalListDisplayItem>, number>(ctx)
            .then(result => {
                this.item.type = ItemTypeEnum[ItemTypeEnum[result]];
                this.itemSaved.emit(this.item);
            }).catch(error => console.error(error));
    }
}
