import { Component, Input, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { android as androidApplication } from 'application';
import { RadDataFormComponent } from 'nativescript-pro-ui/dataform/angular';
import { DataFormEventData } from 'nativescript-pro-ui/dataform';

import { PtItemType } from '../../../../core/models/domain/types';
import { PtNewItemForm, initializeNewItemForm } from '../../../../shared/models/forms/pt-new-item-form.model';
import { ItemType } from '../../../../core/constants/pt-item-types';
import { EMPTY_STRING } from '../../../../core/helpers/string-helpers';
import { setMultiLineEditorFontSize, setPickerEditorImageLocation } from '../../../../shared/helpers/ui-data-form';




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

    private selectedTypeValue: PtItemType;

    public get itemTypeImage() {
        return ItemType.imageResFromType(this.selectedTypeValue);
    }

    public get itemTypeEditorDisplayName() {
        return 'Type';
    }

    constructor() { }

    public ngOnInit() {
        this.newItemForm = initializeNewItemForm();
    }

    public onEditorUpdate(args: DataFormEventData) {
        if (androidApplication) {
            /*
            switch (args.propertyName) {

            }
            */
        } else {
            switch (args.propertyName) {
                case 'title': this.editorSetupMultiLineEditorIos(args.editor); break;
                case 'description': this.editorSetupMultiLineEditorIos(args.editor); break;
                case 'typeStr': this.editorSetupTypeEditorIos(args.editor); break;
            }
        }
    }

    private editorSetupMultiLineEditorIos(editor) {
        setMultiLineEditorFontSize(editor, 17);
    }

    private editorSetupTypeEditorIos(editor) {
        setPickerEditorImageLocation(editor);
        this.selectedTypeValue = editor.editorValueLabel.text;
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
