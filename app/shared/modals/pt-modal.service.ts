import { Injectable, ViewContainerRef, Type } from '@angular/core';
import { ModalDialogOptions, ModalDialogService } from 'nativescript-angular';
import { TextInputModalComponent } from './text-input/text-input.modal.component';
import { ListSelectorModalComponent } from './list-selector/list-selector.modal.component';
import { PtModalContext } from '../models/ui/pt-modal-context.model';
import { PtModalListDisplayItem } from '../models/ui/pt-modal-list-display-item.model';
import { EMPTY_STRING } from '../../core/helpers/string-helpers';


@Injectable()
export class PtModalService {

    private modalIsShowing = false;

    public get isModalShowing() {
        return this.modalIsShowing;
    }

    constructor(
        private modalService: ModalDialogService
    ) { }

    public enumToModalListDisplayItemArray<T>(theEnum): PtModalListDisplayItem<T | string>[] {
        const retArray: PtModalListDisplayItem<T | string>[] = [];

        for (const enumMember in theEnum) {
            if (theEnum.hasOwnProperty(enumMember)) {
                const di: PtModalListDisplayItem<T | string> = {
                    key: enumMember,
                    value: theEnum[enumMember],
                    img: EMPTY_STRING,
                    isSelected: false,
                    payload: enumMember
                };
                retArray.push(di);
            }
        }
        return retArray;
    }

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
        return this.createModal<T, R>(TextInputModalComponent, context);
    }

    public createListSelectorModal<T, R>(
        context: PtModalContext<T, R>
    ): Promise<R> {
        return this.createModal<T, R>(ListSelectorModalComponent, context);
    }


    public createModal<T, R>(
        type: Type<any>,
        context: PtModalContext<T, R>
    ): Promise<R> {
        if (this.modalIsShowing) {
            return Promise.reject<R>('A modal dialog is already showing.');
        }

        return new Promise<R>((resolve, reject) => {
            const options: ModalDialogOptions = {
                viewContainerRef: context.vcRef,
                context: context,
                fullscreen: true
            };
            this.modalIsShowing = true;
            this.modalService.showModal(type, options)
                .then((result) => {
                    resolve(result);
                    this.modalIsShowing = false;
                })
                .catch((err) => {
                    reject(err);
                    this.modalIsShowing = false;
                });

        });
    }
}
