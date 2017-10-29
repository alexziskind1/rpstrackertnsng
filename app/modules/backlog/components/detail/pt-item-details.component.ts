import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, ViewContainerRef, ViewChild, ElementRef, NgZone } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

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


import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular';
import { MyListSelectorModalViewComponent } from './my-list-selector/my-list-selector-modal-view.component';


export const CAR_CLASS_LIST: Array<string> = [
    "Mini",
    "Economy",
    "Compact",
    "Standard",
    "Luxury"
];


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

    public carClassOptions = CAR_CLASS_LIST;

    public carClass = 'Economy';

    private _selectedValue = 'NativeScript';

    public get selectedValue() {
        return this._selectedValue;
    }
    public set selectedValue(val: string) {
        this._selectedValue = val;
    }
    public frameworks = [
        "NativeScript",
        "Xamarin 2",
        "Onsen UI",
        "Ionic Framework",
        "React Native"
    ];


    public assigneeConverter = this;

    public get currentItemType() {
        return this.item ? this.item.type : '';
    }
    public get currentAssigneeName() {
        return this.item ? (this.item.assignee ? this.item.assignee.fullName : 'unassigned') : '...';
    }

    constructor(
        private modalService: ModalDialogService,
        private ptModalService: PtModalService,
        private vcRef: ViewContainerRef,
        private zone: NgZone
    ) { }

    public ngOnInit() {
    }


    onSelectorTap(): void {
        const title = `Select  Framework`;
        const selectedIndex = this.frameworks.indexOf(this.selectedValue);
        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: {
                items: this.frameworks,
                title,
                selectedIndex
            },
            fullscreen: false
        };

        this.modalService.showModal(MyListSelectorModalViewComponent, options)
            .then((selectedValue: string) => {
                if (selectedValue) {
                    this.selectedValue = selectedValue;
                    //this.selectedValueChange.emit(this.selectedValue);
                }
            });
    }

    onSelectorTap2(): void {

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
        //this.zone.run(() => {
        this.ptModalService.createListSelectorModal<PtModalListModel<PtModalListDisplayItem>, string>(ctx)
            .then(result => {
                this.selectedValue = result;
                //this.itemSaved.emit(this.item);
                this._buttonEditorHelper.updateEditorValue(this.natView, this.selectedValue);
            }).catch(error => console.error(error));
        //});

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
            items: this.ptModalService.enumToModalListDisplayItemArray(ItemTypeEnum),
            //items$: Observable.of(this.ptModalService.enumToModalListDisplayItemArray(ItemTypeEnum)),
            selectedIndex: 0
            /*
            loadItemsTrigger: () => {
                return Promise.resolve();
            }*/
        };

        const ctx: PtModalContext<PtModalListModel<PtModalListDisplayItem>, PtItemType> = this.ptModalService.createPtModalContext<PtModalListModel<PtModalListDisplayItem>, PtItemType>(
            this.vcRef,
            'Edit item type',
            ptModalListModel,
            this.item.type
        );
        this.ptModalService.createListSelectorModal<PtModalListModel<PtModalListDisplayItem>, PtItemType>(ctx)
            .then(result => {
                //this.item.type = ItemTypeEnum[ItemTypeEnum[result]];
                this.item.type = result;
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
            items: [],
            selectedIndex: 0,
            /*
            items$: this.users$.map((users) => {
                return users.map(u => {
                    const di: PtModalListDisplayItem = {
                        key: u.id.toString(),
                        value: u.fullName,
                        img: u.avatar,
                        isSelected: false,
                        payload: u
                    };
                    return di;
                });
            }),
            loadItemsTrigger: () => {
                return Promise.resolve(this.usersRequested.emit());
            }*/
        };

        const ctx = this.ptModalService.createPtModalContext<PtModalListModel<PtModalListDisplayItem>, PtUser>(
            this.vcRef,
            'Edit item assignee d',
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

    private viewConnected = false;
    private natView;

    public editorNeedsView(args: DataFormCustomPropertyEditorEventData) {
        if (androidApplication) {
            this._buttonEditorHelper = new ButtonEditorHelper();
            this._buttonEditorHelper.editor = args.object;

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
            const newBtn = new Button();
            newBtn._context = args.context;
            newBtn.text = 'TAP';
            const nativeView = newBtn.createNativeView();

            newBtn.on('tap', () => {
                this.zone.run(() => {
                    this.onSelectorTap2.apply(this);
                });
            });
            args.view = nativeView;
            this.updateEditorValue(nativeView, this.selectedValue);

        } else {
            if (!this.viewConnected) {
                this._buttonEditorHelper = new ButtonEditorHelper();
                this._buttonEditorHelper.editor = args.object;
                this._buttonEditorHelper.iosTapHandler = () => {
                    this.zone.run(() => {
                        this.onSelectorTap2.apply(this);
                    });
                };

                const newBtn = new Button();
                //newBtn._context = args.context;
                newBtn.text = 'TAP';
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

                args.view = this.natView;

                //this.updateEditorValue(nativeView, this.selectedValue);

                this.viewConnected = true;
            } else {
                args.view = this.natView;
            }

            this._buttonEditorHelper.updateEditorValue(this.natView, this.selectedValue);
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

        //this.newView = new Label();
        //this.newView.text = 'hi there';
        //args.view = this.newView;

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

    public updateEditorValue(editorView, value) {
        this._buttonEditorHelper.buttonValue = value;
        editorView.setText(this._buttonEditorHelper.buttonValue);
        //editorView.text = this._buttonEditorHelper.buttonValue;
    }

    public handleTap(editorView, editor) {
        var newValue = this._buttonEditorHelper.buttonValue + 1;
        this.updateEditorValue(editorView, newValue);
        editor.notifyValueChanged();
    }

    convertFrom(dict: any) {
        /// return this._movies.filter((movie: Movie) => movie.id == id)[0].name;
        return this.item.assignee.fullName;

    }

    convertTo(name: string) {
        // return this._movies.filter((movie: Movie) => movie.name == name)[0].id;
        return this.item.assignee;
    }
}


