import {
    Component, OnInit, Input, ChangeDetectionStrategy, Output,
    EventEmitter, ViewContainerRef, ViewChild, NgZone
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { android as androidApplication } from 'application';
import { Button } from 'ui/button';

import { RadDataFormComponent } from 'nativescript-pro-ui/dataform/angular';
import { DataFormCustomPropertyEditorEventData, DataFormEventData } from 'nativescript-pro-ui/dataform';

import { PtItem, PtUser } from '../../../../../core/models/domain';
import { PtItemType } from '../../../../../core/models/domain/types';
import { PriorityEnum } from '../../../../../core/models/domain/enums';
import { PT_ITEM_STATUSES, PT_ITEM_PRIORITIES, COLOR_LIGHT, COLOR_DARK } from '../../../../../core/constants';
import { PtModalService } from '../../../../../shared/modals/pt-modal.service';
import { PtModalContext, PtModalListModel, PtModalListDisplayItem, ptUserToModalListDisplayItem } from '../../../../../shared/models/ui';
import { PtItemDetailsEditFormModel, ptItemToFormModel } from '../../../../../shared/models/forms';
import { ItemType } from '../../../../../core/constants/pt-item-types';
import {
    ButtonEditorHelper,
    setMultiLineEditorFontSize,
    setPickerEditorImageLocation,
    setStepperEditorTextPostfix,
    setStepperEditorContentOffset,
    setStepperEditorColors,
    setSegmentedEditorColor,
    getPickerEditorValueText
} from '../../../../../shared/helpers/ui-data-form';


@Component({
    moduleId: module.id,
    selector: 'pt-item-details',
    templateUrl: 'pt-item-details.component.html',
    styleUrls: ['pt-item-details.component.css'],
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
    public itemTypesProvider = ItemType.List.map((t) => t.PtItemType);
    public statusesProvider = PT_ITEM_STATUSES;
    public prioritiesProvider = PT_ITEM_PRIORITIES;

    private selectedTypeValue: PtItemType;
    private selectedPriorityValue: PriorityEnum;

    private itemTypeEditorBtnHelper: ButtonEditorHelper;
    private itemTypeEditorViewConnected = false;
    private itemTypeNativeView;

    public get itemTypeImage() {
        return ItemType.imageResFromType(this.selectedTypeValue);
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
        this.itemForm = ptItemToFormModel(this.item);

        this.usersLocal$ = this.users$
            .filter(users => users.length > 0)
            .distinctUntilChanged((ua1, ua2) => ua1.length === ua2.length)
            .shareReplay(1);

        this.selectedTypeValue = <PtItemType>this.itemForm.typeStr;
        this.selectedPriorityValue = <PriorityEnum>this.itemForm.priorityStr;
    }

    public onPropertyCommitted(_args: DataFormEventData) {
        this.notifyUpdateItem();
    }

    public onEditorUpdate(args: DataFormEventData) {
        switch (args.propertyName) {
            case 'description': this.editorSetupDescription(args.editor); break;
            case 'typeStr': this.editorSetupType(args.editor); break;
            case 'estimate': this.editorSetupEstimate(args.editor); break;
            case 'priorityStr': this.editorSetupPriority(args.editor); break;
        }

        /*
        if (androidApplication) {
        } else {
            switch (args.propertyName) {
                case 'description': this.editorSetupDescriptionEditorIos(args.editor); break;
                case 'typeStr': this.editorSetupTypeEditorIos(args.editor); break;
                case 'estimate': this.editorSetupEstimateEditorIos(args.editor); break;
                case 'priorityStr': this.editorSetupPriorityEditorIOS(args.editor); break;
            }
        }
        */
    }

    private editorSetupDescription(editor) {
        setMultiLineEditorFontSize(editor, 17);
    }

    private editorSetupType(editor) {
        setPickerEditorImageLocation(editor);
        this.selectedTypeValue = <PtItemType>getPickerEditorValueText(editor);
    }

    private editorSetupEstimate(editor) {
        setStepperEditorContentOffset(editor, -25, 0);
        setStepperEditorTextPostfix(editor, 'point', 'points');
        setStepperEditorColors(editor, COLOR_LIGHT, COLOR_DARK);
    }

    private editorSetupPriority(editor) {
        const editorPriority = <PriorityEnum>editor.value;
        this.selectedPriorityValue = editorPriority ? editorPriority : <PriorityEnum>this.itemForm.priorityStr;
        setSegmentedEditorColor(editor, PriorityEnum.getColor(this.selectedPriorityValue));
    }

    /*
    private editorSetupEstimateEditorAndroid(editor) {
        editor.getHeaderView().setPadding(12, 12, 12, 48);
    }
    */

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

    public onItemTypeEditorBtnTap(): void {
        this.assigneesSub = this.usersLocal$.subscribe((users) => {
            this.users = users;
            const ptModalListModel: PtModalListModel<PtModalListDisplayItem<PtUser>> = {
                items: users.map(ptUserToModalListDisplayItem),
                selectedItem: this.item ? ptUserToModalListDisplayItem(this.item.assignee) : undefined
            };

            const ctx: PtModalContext<PtModalListModel<PtModalListDisplayItem<PtUser>>, PtUser> =
                this.ptModalService.createPtModalContext<PtModalListModel<PtModalListDisplayItem<PtUser>>, PtUser>(
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

    public onAssigneeEditorNeedsView(args: DataFormCustomPropertyEditorEventData) {
        const newBtn = new Button();
        newBtn.style.color = COLOR_DARK;
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
                this.itemTypeNativeView.setTitleColorForState(COLOR_DARK.ios, UIControlState.Normal);
                this.itemTypeNativeView.addTargetActionForControlEvents(this.itemTypeEditorBtnHelper,
                    'handleTap:', UIControlEvents.TouchUpInside);
                this.itemTypeEditorViewConnected = true;
            }
            args.view = this.itemTypeNativeView;
            this.itemTypeEditorBtnHelper.updateEditorValue(this.itemTypeNativeView, this.itemForm.assigneeName);

        }
    }

    /*
    /// If we are using a modal to edit description
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
    */

    public editorHasToApplyValue(args: DataFormCustomPropertyEditorEventData) {
        this.itemTypeEditorBtnHelper.updateEditorValue(args.view, args.value);
    }

    public editorNeedsValue(args: DataFormCustomPropertyEditorEventData) {
        args.value = this.itemTypeEditorBtnHelper.buttonValue;
    }
}
