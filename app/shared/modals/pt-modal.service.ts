import { Injectable, ViewContainerRef } from '@angular/core';
import { ModalDialogOptions, ModalDialogService } from 'nativescript-angular';
import { TextInputModalComponent } from './text-input/text-input.modal.component';
import { ListSelectorModalComponent } from './list-selector/list-selector.modal.component';
import { PtModalContext } from '../models/ui/pt-modal-context.model';
import { PtModalListDisplayItem } from '../models/ui/pt-modal-list-display-item.model';


@Injectable()
export class PtModalService {

    constructor(
        private modalService: ModalDialogService
    ) { }

    public enumToModalListDisplayItemArray(theEnum): PtModalListDisplayItem[] {
        let retArray: PtModalListDisplayItem[] = [];
        for (var enumMember in theEnum) {
            const di: PtModalListDisplayItem = {
                value: enumMember,
                title: theEnum[enumMember],
                img: '',
                isSelected: false
            };
            retArray.push(di);
        }
        return retArray;
    }

    /*
    public enumToModalListDisplayItemArray(theEnum): PtModalListDisplayItem[] {
        let retArray: PtModalListDisplayItem[] = [];
        for (var enumMember in theEnum) {
            const intVal = parseInt(enumMember, 10);
            const isValueProperty = intVal >= 0;
            if (isValueProperty) {
                retArray.push({ value: intVal, title: theEnum[enumMember], img: theEnum.getImage(intVal), isSelected: false });
            }
        }
        return retArray;
    }
    */

    public createPtModalContext<T, R>(
        vcRef: ViewContainerRef,
        title: string,
        payload: T,
        defaultResult: R = null,
        btnOkText: string = 'Done',
        btnCancelText: string = 'Cancel'
    ): PtModalContext<T, R> {
        return {
            vcRef,
            title,
            payload,
            defaultResult,
            btnOkText,
            btnCancelText
        };
    }

    public createTextInputModal<T, R>(
        context: PtModalContext<T, R>
    ): Promise<R> {
        const options: ModalDialogOptions = {
            viewContainerRef: context.vcRef,
            context: context,
            fullscreen: true
        };
        return this.modalService.showModal(TextInputModalComponent, options);
    }

    public createListSelectorModal<T, R>(
        context: PtModalContext<T, R>
    ): Promise<R> {
        const options: ModalDialogOptions = {
            viewContainerRef: context.vcRef,
            context: context,
            fullscreen: true
        };
        return this.modalService.showModal(ListSelectorModalComponent, options);
    }
}
