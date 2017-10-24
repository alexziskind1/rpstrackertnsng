import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, ViewContainerRef } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ModalDialogOptions, ModalDialogService } from 'nativescript-angular';

import { PtItem } from '../../../../shared/models/domain';
import { TextInputModalComponent } from '../../../../shared/modals/text-input.modal.component';


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
        private modalService: ModalDialogService,
        private vcRef: ViewContainerRef
    ) { }

    public ngOnInit() { }

    public onDialogSaveTap(args) {
        this.itemSaved.emit(this.item);
    }

    public onTitleTap(args) {
        this.createTextInputModal(this.item.title).then(result => {
            this.item.title = result;
            this.itemSaved.emit(this.item);
        }).catch(error => console.error(error));
    }

    public onDescriptionTap(args) {
        this.createTextInputModal(this.item.description).then(result => {
            this.item.description = result;
            this.itemSaved.emit(this.item);
        }).catch(error => console.error(error));
    }

    private createTextInputModal(intialText: string): Promise<any> {
        const today = new Date();
        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: intialText,
            fullscreen: true,
        };

        return this.modalService.showModal(TextInputModalComponent, options);
    }
}
