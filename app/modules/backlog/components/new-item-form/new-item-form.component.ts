import { Component, Input, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { RadDataFormComponent } from 'nativescript-pro-ui/dataform/angular';

import { PtNewItemForm } from '../../../../shared/models/forms/pt-new-item-form.model';
import { ItemType } from '../../../../core/constants/pt-item-types';
import { EMPTY_STRING } from '../../../../core/helpers/string-helpers';


@Component({
    moduleId: module.id,
    selector: 'pt-new-item-form',
    templateUrl: 'new-item-form.component.html',
    styleUrls: ['new-item-form.component.css']
})

export class NewItemFormComponent implements OnInit {

    @Input() btnOkText = 'Save';
    @Input() btnCancelText = 'Cancel';
    @Output() formSaved = new EventEmitter<PtNewItemForm>();
    @Output() formCancelled = new EventEmitter();
    @ViewChild('itemDetailsDataForm') itemDetailsDataForm: RadDataFormComponent;

    public newItemForm: PtNewItemForm;
    public itemTypesProvider = ItemType.List.map((t) => t.PtItemType);

    constructor() { }

    public ngOnInit() {
        this.newItemForm = {
            title: EMPTY_STRING,
            description: EMPTY_STRING,
            typeStr: EMPTY_STRING
        };
    }

    public onSaveTap() {
        this.itemDetailsDataForm.dataForm.validateAndCommitAll()
            .then(ok => {
                if (ok) {
                    this.formSaved.emit(this.newItemForm);
                }
            });
    }

    public onCancelTap() {
        this.formCancelled.emit();
    }
}
