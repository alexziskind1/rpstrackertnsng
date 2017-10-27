import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import { android as androidApplication } from 'application';
import { Label } from 'ui/label';
import { Button } from 'ui/button';
import { StackLayout } from 'ui/layouts/stack-layout';

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

    @ViewChild('itemDetailsDataForm') itemDetailsDataForm: RadDataFormComponent;
    @ViewChild('btnTapHtml') btnTapHtml: ElementRef;

    public itemTypesProvider = PT_ITEM_TYPES;
    public statusesProvider = PT_ITEM_STATUSES;
    public prioritiesProvider = PT_ITEM_PRIORITIES;


    public get currentAssigneeName() {
        return this.item ? (this.item.assignee ? this.item.assignee.fullName : 'unassigned') : '...';
    }

    constructor(
        private ptModalService: PtModalService,
        private vcRef: ViewContainerRef
    ) { }

    public ngOnInit() {
    }

    public onDialogSaveTap(args) {
        this.itemDetailsDataForm.dataForm.validateAndCommitAll()
            .then(ok => {
                if (ok) {
                    this.itemSaved.emit(this.item);
                }
            })
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
            //items: this.ptModalService.enumToModalListDisplayItemArray(ItemTypeEnum),
            //selectedIndex: enumValueIndex(this.item.type, ItemTypeEnum)
            items$: Observable.of([]),
            selectedIndex: 0,
            loadItemsTrigger: () => {
                return Promise.resolve();
                //this.usersRequested.emit();
            }
        };

        const ctx = this.ptModalService.createPtModalContext<PtModalListModel<PtModalListDisplayItem>, number>(
            this.vcRef,
            'Edit item type',
            ptModalListModel,
            0
            //this.item.type
        );
        this.ptModalService.createListSelectorModal<PtModalListModel<PtModalListDisplayItem>, number>(ctx)
            .then(result => {
                //this.item.type = ItemTypeEnum[ItemTypeEnum[result]];
                this.itemSaved.emit(this.item);
            }).catch(error => console.error(error));
    }

    private newView: Label;
    private _buttonEditorHelper: ButtonEditorHelper;
    private iosEditorView: StackLayout;
    private iosEditorBtn: Button;

    private userToModalDisplayItem(user: PtUser) {

    }

    public onAssigneeTap(args) {
        //this.users$.subscribe(users => {
        //    console.log('users loaded');
        //});


        const ptModalListModel: PtModalListModel<PtModalListDisplayItem> = {
            //items: this.ptModalService.enumToModalListDisplayItemArray(ItemTypeEnum),
            //selectedIndex: enumValueIndex(this.item.type, ItemTypeEnum),
            //items: Observable.of(this.ptModalService.enumToModalListDisplayItemArray(ItemTypeEnum)),
            selectedIndex: 0,
            items$: this.users$.map((users) => {
                return users.map(u => {
                    const di: PtModalListDisplayItem = {
                        value: u.id.toString(),
                        title: u.fullName,
                        img: u.avatar,
                        isSelected: false
                    };
                    return di;
                });
            }),
            loadItemsTrigger: () => {
                return Promise.resolve(this.usersRequested.emit());
            }
        };

        const ctx = this.ptModalService.createPtModalContext<PtModalListModel<PtModalListDisplayItem>, PtUser>(
            this.vcRef,
            'Edit item assignee',
            ptModalListModel,
            this.item.assignee
        );
        this.ptModalService.createListSelectorModal<PtModalListModel<PtModalListDisplayItem>, PtUser>(ctx)
            .then(result => {
                this.item.assignee = result;
                //this.item.type = <PtItemType>result;
                this.itemSaved.emit(this.item);
            }).catch(error => console.error(error));
    }

    public editorNeedsView(args: DataFormCustomPropertyEditorEventData) {

        if (androidApplication) {
            /*
            this._buttonEditorHelper = new ButtonEditorHelper();
            this._buttonEditorHelper.editor = args.object;
            var androidEditorView: android.widget.Button = new android.widget.Button(args.context);
            var that = this;
            androidEditorView.setOnClickListener(new android.view.View.OnClickListener({
                onClick(view: android.view.View) {
                    that.handleTap(view, args.object);
                }
            }));
            args.view = androidEditorView;
            this.updateEditorValue(androidEditorView, this._person.age);
            */
        } else {
            this._buttonEditorHelper = new ButtonEditorHelper();
            this._buttonEditorHelper.editor = args.object;

            //var iosEditorView = UIButton.buttonWithType(UIButtonType.System);
            //iosEditorView.contentHorizontalAlignment = UIControlContentHorizontalAlignment.Left;
            //iosEditorView.addTargetActionForControlEvents(this._buttonEditorHelper, "handleTap:", UIControlEvents.TouchUpInside);

            this.iosEditorView = new StackLayout();
            this.iosEditorView.className = 'stack-class';

            this.iosEditorBtn = new Button();

            this.iosEditorView.addChild(this.iosEditorBtn);

            setTimeout(() => {
                this.iosEditorBtn.set('text', 'TAP');
                this.iosEditorBtn.text = 'TAP';
            }, 500);

            this.iosEditorView.on('tap', () => this.onDescriptionTap(null));

            this._buttonEditorHelper.editorBtn = this.iosEditorBtn;

            //args.view = this.iosEditorBtn.ios;
            args.view = this.btnTapHtml.nativeElement.ios;
        }

        //this.newView = new Label();
        //this.newView.text = 'hi there';
        //args.view = this.newView;

    }

    public editorHasToApplyValue(args: DataFormCustomPropertyEditorEventData) {
        this._buttonEditorHelper.updateEditorValue(args.view, args.value);
        //args.view.text
    }

    public editorNeedsValue(args: DataFormCustomPropertyEditorEventData) {
        //args.value = this.newView.text;
        args.value = this._buttonEditorHelper.buttonValue;
    }
}


// >> dataform-button-editor-helper-ios
export class ButtonEditorHelper extends NSObject {
    public buttonValue: number;
    public editor: CustomPropertyEditor;
    public editorBtn: Button;

    public updateEditorValue(editorView, newValue) {
        this.buttonValue = newValue;
        //editorView.setTitleForState(this.buttonValue + " (tap to blah)", UIControlState.Normal);
        //this.editorBtn.text = 'hello ' + this.buttonValue;
        editorView.text = 'hello there you';
    }

    public "handleTap:"(sender) {
        var newValue = this.buttonValue + 1;
        this.updateEditorValue(sender, newValue);
        this.editor.notifyValueChanged();
    }

    public static ObjCExposedMethods = {
        "handleTap:": { returns: interop.types.void, params: [UIView.class()] }
    };
}
// << dataform-button-editor-helper-ios
