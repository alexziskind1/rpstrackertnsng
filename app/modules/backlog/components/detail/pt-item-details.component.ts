import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, ViewContainerRef, ViewChild, ElementRef, NgZone } from '@angular/core';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/shareReplay';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';


import { android as androidApplication } from 'application';
import { Label } from 'ui/label';
import { Button } from 'ui/button';
import { StackLayout } from 'ui/layouts/stack-layout';
import { GridLayout } from 'ui/layouts/grid-layout';

import { RadDataFormComponent } from 'nativescript-pro-ui/dataform/angular';
import { CustomPropertyEditor, DataFormCustomPropertyEditorEventData } from 'nativescript-pro-ui/dataform';

import { PtItem, PtUser } from '../../../../shared/models/domain';
import { TextInputModalComponent } from '../../../../shared/modals/text-input/text-input.modal.component';
import { PtModalService } from '../../../../shared/modals/pt-modal.service';

import { PtModalContext } from '../../../../shared/models/ui/pt-modal-context.model';
import { PriorityEnum, StatusEnum, ItemTypeEnum } from '../../../../shared/models/domain/enums';
import { PtModalListModel } from '../../../../shared/models/ui/pt-modal-list.model';
import { enumValueIndex } from '../../../../shared/utils/enum-util';
import { PtModalListDisplayItem } from '../../../../shared/models/ui/pt-modal-list-display-item.model';
import { PT_ITEM_TYPE_DISPLAY_MAPPING, PT_ITEM_TYPES } from '../../../../shared/models/ui/pt-item-type.model.impl';
import { PtItemType } from '../../../../shared/models/domain/types';
import { PT_ITEM_STATUSES, PT_ITEM_PRIORITIES } from '../../../../shared/constants';
import { ButtonEditorHelper } from './button-editor-helper';
import { MyListSelectorModalViewComponent } from './my-list-selector/my-list-selector-modal-view.component';
import { PtItemDetailsEditFormModel } from '../../../../shared/models/forms';



@Component({
    moduleId: module.id,
    selector: 'pt-item-details',
    templateUrl: 'pt-item-details.component.html',
    styles: [`
        .stack-class {
            background-color: red;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtItemDetailsComponent implements OnInit {

    @Input() public item: PtItem;
    @Input() public users$: Observable<PtUser[]>;
    @Output() usersRequested = new EventEmitter();
    @Output() itemSaved = new EventEmitter<PtItem>();


    private users: PtUser[] = [];

    private usersLocal$: Observable<PtUser[]>;

    private assigneesSub: Subscription;

    public itemForm: PtItemDetailsEditFormModel;

    private reselectedAssignee: PtUser;


    @ViewChild('itemDetailsDataForm') itemDetailsDataForm: RadDataFormComponent;
    @ViewChild('btnTapHtml') btnTapHtml: ElementRef;

    public itemTypesProvider = PT_ITEM_TYPES;
    public statusesProvider = PT_ITEM_STATUSES;
    public prioritiesProvider = PT_ITEM_PRIORITIES;


    public get currentItemType() {
        return this.item ? this.item.type : '';
    }
    /*public get currentAssigneeName() {
        return this.item ? (this.item.assignee ? this.item.assignee.fullName : 'unassigned') : '...';
    }
    public get currentAssigneeAvatar() {
        return this.item ? (this.item.assignee ? this.item.assignee.avatar : '') : '';
    }
    */

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
            assigneeName: this.item.assignee ? this.item.assignee.fullName : 'unassigned' //this.ptUserToPtItemAssigneeFormFields(this.item.assignee)
        };

        this.usersLocal$ = this.users$
            .filter(users => users.length > 0)
            .distinctUntilChanged((ua1, ua2) => ua1.length === ua2.length)
            .shareReplay(1);
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

    public onSelectorTap2(): void {
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
                    //this.item.assignee = result;
                    this.reselectedAssignee = result;
                    this.itemForm.assigneeName = result.fullName;

                    this._buttonEditorHelper.updateEditorValue(this.natView, this.itemForm.assigneeName);
                    this.assigneesSub.unsubscribe();
                }).catch(error => {
                    console.error(error);
                    this.assigneesSub.unsubscribe();
                });
        });

        if (this.users.length === 0) {
            this.usersRequested.emit();
        }


        /*
        const ptModalListModel: PtModalListModel<PtModalListDisplayItem> = {
            items: this.frameworks.map(f => {
                return {
                    key: f,
                    value: f,
                    img: '',
                    isSelected: false,
                    payload: f
                };
            }),
            selectedIndex: this.frameworks.indexOf(this.selectedValue)
        };

        const ctx: PtModalContext<PtModalListModel<PtModalListDisplayItem>, string> = this.ptModalService.createPtModalContext<PtModalListModel<PtModalListDisplayItem>, string>(
            this.vcRef,
            'select framework d',
            ptModalListModel,
            this.selectedValue
        );

        this.ptModalService.createListSelectorModal<PtModalListModel<PtModalListDisplayItem>, string>(ctx)
            .then(result => {
                this.selectedValue = result;
                this._buttonEditorHelper.updateEditorValue(this.natView, this.selectedValue);
            }).catch(error => console.error(error));

            */
    }


    public onDialogSaveTap(args) {
        this.itemDetailsDataForm.dataForm.validateAndCommitAll()
            .then(ok => {
                if (ok) {
                    const updatedItem = this.getUpdatedItem();
                    this.itemSaved.emit(updatedItem);
                }
            })
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



    private newView: Label;
    private _buttonEditorHelper: ButtonEditorHelper;
    private iosEditorView: StackLayout;
    private iosEditorBtn: Button;

    private viewConnected = false;
    private natView;

    public editorNeedsView(args: DataFormCustomPropertyEditorEventData) {
        const newBtn = new Button();
        this._buttonEditorHelper = new ButtonEditorHelper();
        this._buttonEditorHelper.editor = args.object;

        if (androidApplication) {
            if (!this.viewConnected) {


                /*
                var androidEditorView: android.widget.Button = new android.widget.Button(args.context);
                var that = this;
                androidEditorView.setOnClickListener(new android.view.View.OnClickListener({
                    onClick(view: android.view.View) {
                        that.zone.run(() => {
                            that.onSelectorTap2.apply(that);
                        });
                    }
                }));
                args.view = androidEditorView;
                this.updateEditorValue(androidEditorView, this.selectedValue);
                */

                /*
                if (this.viewConnected) {
                    return;
                }
                const gridLayout = <GridLayout>(<Label>this.btnTapHtml.nativeElement).parent;
                const gridChild = gridLayout.getChildAt(0);
                const gridChildNative = gridChild.android;
                gridLayout.removeChild(gridChild);
                const that = this;
                gridChildNative.setOnClickListener(new android.view.View.OnClickListener({
                    onClick(view: android.view.View) {
                        that.onSelectorTap2();
                        //that.handleTap(view, args.object);
                    }
                }));
    
                args.view = gridChildNative;
                this.viewConnected = true;
                this.updateEditorValue(gridChildNative, this.selectedValue);
                */

                newBtn._context = args.context;

                this.natView = newBtn.createNativeView();

                newBtn.on('tap', () => {
                    this.zone.run(() => {
                        this.onSelectorTap2.apply(this);
                    });
                });
                this.viewConnected = true;
            }

            args.view = this.natView;
            this._buttonEditorHelper.updateEditorValue(this.natView, this.itemForm.assigneeName);

        } else {
            if (!this.viewConnected) {
                this._buttonEditorHelper.iosTapHandler = () => {
                    this.zone.run(() => {
                        this.onSelectorTap2.apply(this);
                    });
                };


                //newBtn._context = args.context;
                //const nativeView = newBtn.createNativeView();

                /*
                newBtn.on('tap', () => {
                    this.zone.run(() => {
                        this.onSelectorTap2.apply(this);
                    });
                });
                */

                this.natView = newBtn.nativeView;

                this.natView.addTargetActionForControlEvents(this._buttonEditorHelper, "handleTap:", UIControlEvents.TouchUpInside);
                this.viewConnected = true;
            }
            args.view = this.natView;
            this._buttonEditorHelper.updateEditorValue(this.natView, this.itemForm.assigneeName);
            //var iosEditorView = UIButton.buttonWithType(UIButtonType.System);
            //iosEditorView.contentHorizontalAlignment = UIControlContentHorizontalAlignment.Left;
            //iosEditorView.addTargetActionForControlEvents(this._buttonEditorHelper, "handleTap:", UIControlEvents.TouchUpInside);

            /*
            this.iosEditorView = new StackLayout();
            this.iosEditorView.className = 'stack-class';

            this.iosEditorBtn = new Button();

            this.iosEditorView.addChild(this.iosEditorBtn);

            setTimeout(() => {
                this.iosEditorBtn.set('text', 'TAP');
                this.iosEditorBtn.text = 'TAP';
            }, 500);

            this.iosEditorView.on('tap', () => this.onDescriptionTap(null));
            */

            //this._buttonEditorHelper.editorBtn = this.iosEditorBtn;

            //args.view = this.iosEditorBtn.ios;
            //args.view = this.btnTapHtml.nativeElement.ios;
        }
    }

    public editorHasToApplyValue(args: DataFormCustomPropertyEditorEventData) {
        this._buttonEditorHelper.updateEditorValue(args.view, args.value);
        //args.view.text
        //return args.value.valueForKey('fullName');
        //var a = 0;
    }

    public editorNeedsValue(args: DataFormCustomPropertyEditorEventData) {
        //args.value = this.newView.text;
        args.value = this._buttonEditorHelper.buttonValue;
        //var a = 0;
    }
}
