import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, ViewContainerRef, ViewChild, ElementRef, NgZone } from '@angular/core';


import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';


import { android as androidApplication } from 'application';
import { Color } from 'color';
import { Button } from 'ui/button';


import { RadDataFormComponent } from 'nativescript-pro-ui/dataform/angular';
import { CustomPropertyEditor, DataFormCustomPropertyEditorEventData, DataFormEventData, EntityProperty, RadDataForm, PropertyEditor } from 'nativescript-pro-ui/dataform';


import { PtItem, PtUser } from '../../../../../core/models/domain';
import { PtItemType } from '../../../../../core/models/domain/types';
import { PriorityEnum, StatusEnum, ItemTypeEnum } from '../../../../../core/models/domain/enums';
import { PT_ITEM_STATUSES, PT_ITEM_PRIORITIES, PT_ITEM_TYPES, getPtTypeImage } from '../../../../../core/constants';
import { PtModalService } from '../../../../../shared/modals/pt-modal.service';
import { PtModalContext, PtModalListModel, PtModalListDisplayItem } from '../../../../../shared/models/ui';

import { PtItemDetailsEditFormModel } from '../../../../../shared/models/forms';
import { ButtonEditorHelper } from '../../../../../shared/helpers/button-editor-helper/button-editor-helper';


var colorLight = new Color("#CDDC39");
var colorDark = new Color("#4CAF50");
var colorGray = new Color("#F9F9F9");


@Component({
    moduleId: module.id,
    selector: 'pt-item-details',
    templateUrl: 'pt-item-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtItemDetailsComponent implements OnInit {

    @Input() item: PtItem;
    @Input() users$: Observable<PtUser[]>;
    @Output() usersRequested = new EventEmitter();
    @Output() itemSaved = new EventEmitter<PtItem>();

    @ViewChild('itemDetailsDataForm') itemDetailsDataForm: RadDataFormComponent;

    private users: PtUser[] = [];
    private usersLocal$: Observable<PtUser[]>;
    private assigneesSub: Subscription;
    private reselectedAssignee: PtUser;

    public itemForm: PtItemDetailsEditFormModel;
    public itemTypesProvider = PT_ITEM_TYPES;
    public statusesProvider = PT_ITEM_STATUSES;
    public prioritiesProvider = PT_ITEM_PRIORITIES;

    private selectedTypeValue: PtItemType;
    private selectedPriorityValue: PriorityEnum;

    private itemTypeEditorBtnHelper: ButtonEditorHelper;
    private itemTypeEditorViewConnected = false;
    private itemTypeNativeView;

    public get itemTypeImage() {
        return getPtTypeImage(this.selectedTypeValue);
    }

    public get itemTypeEditorDisplayName() {
        return 'Type';
    }

    constructor(
        private ptModalService: PtModalService,
        private vcRef: ViewContainerRef,
        private zone: NgZone
    ) { }

    public ngOnInit() {
        this.itemForm = {
            title: this.item.title,
            description: this.item.description,
            typeStr: this.item.type,
            statusStr: this.item.status,
            estimate: this.item.estimate,
            priorityStr: this.item.priority,
            assigneeName: this.item.assignee ? this.item.assignee.fullName : 'unassigned'
        };

        this.usersLocal$ = this.users$
            .filter(users => users.length > 0)
            .distinctUntilChanged((ua1, ua2) => ua1.length === ua2.length)
            .shareReplay(1);

        this.selectedTypeValue = <PtItemType>this.itemForm.typeStr;
        this.selectedPriorityValue = <PriorityEnum>this.itemForm.priorityStr;
    }

    public onPropertyCommitted(args: DataFormEventData) {
        switch (args.propertyName) {
            case 'typeStr':

                break;
            case 'estimate':

                break;
            case 'priorityStr':

                break;
        }
        this.notifyUpdateItem();
    }

    public onEditorUpdate(args: DataFormEventData) {
        if (androidApplication) {
            /*
            switch (args.propertyName) {
                case "appVolume": this.editorSetupSliderAndroid(args.editor); break;
                case "onlyOnWiFi": this.editorSetupSwitchAndroid(args.editor); break;
                case "networkLimit": this.editorSetupStepperAndroid(args.editor); break;
                case "networkPreference": this.editorSetupSegmentedEditorAndroid(args.editor); break;
            }
            */
        } else {
            switch (args.propertyName) {
                case 'description': this.editorSetupDescriptionEditorIos(args.editor); break;
                case 'typeStr': this.editorSetupTypeEditorIos(args.editor); break;
                case 'estimate': this.editorSetupEstimateEditorIos(args.editor); break;
                case 'priorityStr': this.editorSetupPriorityEditorIOS(args.editor); break;
                /*
                case "onlyOnWiFi": this.editorSetupSwitchAndroid(args.editor); break;
                case "networkLimit": this.editorSetupStepperAndroid(args.editor); break;
                case "networkPreference": this.editorSetupSegmentedEditorAndroid(args.editor); break;
                */
            }
        }
    }

    private editorSetupDescriptionEditorIos(editor) {
        const textViewDef = editor.gridLayout.definitionForView(editor.textView);
        textViewDef.view.font = UIFont.fontWithNameSize(textViewDef.view.font.fontName, 17);
    }

    private editorSetupTypeEditorIos(editor) {
        const labelDef = editor.gridLayout.definitionForView(editor.textLabel);
        const imageDef = editor.gridLayout.definitionForView(editor.imageView);
        labelDef.column = 0;
        imageDef.column = 1;

        this.selectedTypeValue = editor.editorValueLabel.text;
    }

    private editorSetupEstimateEditorIos(editor) {
        const labelDef = editor.gridLayout.definitionForView(editor.valueLabel);
        labelDef.contentOffset = {
            horizontal: -25,
            vertical: 0
        };
        const numVal = parseInt(labelDef.view.text);
        if (numVal === 1) {
            labelDef.view.text = '1 point';
        } else {
            labelDef.view.text = `${numVal} points`;
        }

        //editor.valueLabel.textColor = colorDark.ios;


        var coreEditor = <UIStepper>editor.editor;
        coreEditor.tintColor = colorLight.ios;


        for (var i = 0; i < coreEditor.subviews.count; i++) {
            if (coreEditor.subviews[i] instanceof UIButton) {
                (<any>coreEditor.subviews[i]).imageView.tintColor = colorDark.ios;
            }
        }

    }

    private editorSetupEstimateEditorAndroid(editor) {
        editor.getHeaderView().setPadding(12, 12, 12, 48);
    }

    private editorSetupPriorityEditorIOS(editor) {
        const editorPriority = <PriorityEnum>editor.value;
        this.selectedPriorityValue = editorPriority ? editorPriority : <PriorityEnum>this.itemForm.priorityStr;
        const coreEditor = <UISegmentedControl>editor.editor;
        coreEditor.tintColor = PriorityEnum.getColor(this.selectedPriorityValue).ios;
    }



    private ptUserToModalListDisplayItem(u: PtUser): PtModalListDisplayItem<PtUser> {
        if (!u) {
            return undefined;
        } else {
            const di: PtModalListDisplayItem<PtUser> = {
                key: u.id.toString(),
                value: u.fullName,
                img: u.avatar,
                isSelected: false,
                payload: u
            };
            return di;
        }
    }

    public onItemTypeEditorBtnTap(): void {
        this.assigneesSub = this.usersLocal$.subscribe((users) => {
            this.users = users;
            const ptModalListModel: PtModalListModel<PtModalListDisplayItem<PtUser>> = {
                items: users.map(this.ptUserToModalListDisplayItem),
                selectedItem: this.item ? this.ptUserToModalListDisplayItem(this.item.assignee) : undefined
            };

            const ctx: PtModalContext<PtModalListModel<PtModalListDisplayItem<PtUser>>, PtUser> = this.ptModalService.createPtModalContext<PtModalListModel<PtModalListDisplayItem<PtUser>>, PtUser>(
                this.vcRef,
                'Select Assignee',
                ptModalListModel,
                this.item.assignee
            );

            this.ptModalService.createListSelectorModal<PtModalListModel<PtModalListDisplayItem<PtUser>>, PtUser>(ctx)
                .then(result => {
                    this.reselectedAssignee = result;
                    this.itemForm.assigneeName = result.fullName;

                    this.itemTypeEditorBtnHelper.updateEditorValue(this.itemTypeNativeView, this.itemForm.assigneeName);
                    this.itemTypeEditorBtnHelper.editor.notifyValueChanged();
                    this.assigneesSub.unsubscribe();
                }).catch(error => {
                    console.error(error);
                    this.assigneesSub.unsubscribe();
                });
        });

        if (this.users.length === 0) {
            this.usersRequested.emit();
        }
    }


    private notifyUpdateItem() {
        this.itemDetailsDataForm.dataForm.validateAll()
            .then(ok => {
                if (ok) {
                    const updatedItem = this.getUpdatedItem();
                    this.itemSaved.emit(updatedItem);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    private getUpdatedItem(): PtItem {
        const updatedAssignee = this.reselectedAssignee ? this.reselectedAssignee : this.item.assignee;
        const updatedItem = Object.assign({}, this.item, {
            title: this.itemForm.title,
            description: this.itemForm.description,
            type: this.itemForm.typeStr,
            status: this.itemForm.statusStr,
            priority: this.itemForm.priorityStr,
            estimate: this.itemForm.estimate,
            assignee: updatedAssignee
        });
        return updatedItem;
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


    public onAssigneeEditorNeedsView(args: DataFormCustomPropertyEditorEventData) {
        const newBtn = new Button();
        newBtn.style.color = colorDark;
        this.itemTypeEditorBtnHelper = new ButtonEditorHelper();
        this.itemTypeEditorBtnHelper.editor = args.object;

        if (androidApplication) {
            if (!this.itemTypeEditorViewConnected) {

                newBtn._context = args.context;

                this.itemTypeNativeView = newBtn.createNativeView();

                newBtn.on('tap', () => {
                    this.zone.run(() => {
                        this.onItemTypeEditorBtnTap.apply(this);
                    });
                });
                this.itemTypeEditorViewConnected = true;
            }

            args.view = this.itemTypeNativeView;
            this.itemTypeEditorBtnHelper.updateEditorValue(this.itemTypeNativeView, this.itemForm.assigneeName);

        } else {
            if (!this.itemTypeEditorViewConnected) {
                this.itemTypeEditorBtnHelper.iosTapHandler = () => {
                    this.zone.run(() => {
                        this.onItemTypeEditorBtnTap.apply(this);
                    });
                };


                this.itemTypeNativeView = <UIButton>newBtn.nativeView;
                this.itemTypeNativeView.setTitleColorForState(colorDark.ios, UIControlState.Normal);
                this.itemTypeNativeView.addTargetActionForControlEvents(this.itemTypeEditorBtnHelper, "handleTap:", UIControlEvents.TouchUpInside);
                this.itemTypeEditorViewConnected = true;
            }
            args.view = this.itemTypeNativeView;
            this.itemTypeEditorBtnHelper.updateEditorValue(this.itemTypeNativeView, this.itemForm.assigneeName);

        }
    }

    public editorHasToApplyValue(args: DataFormCustomPropertyEditorEventData) {
        this.itemTypeEditorBtnHelper.updateEditorValue(args.view, args.value);
        //args.view.text
        //return args.value.valueForKey('fullName');
        //var a = 0;
    }

    public editorNeedsValue(args: DataFormCustomPropertyEditorEventData) {
        //args.value = this.newView.text;
        args.value = this.itemTypeEditorBtnHelper.buttonValue;
        //var a = 0;
    }
}
