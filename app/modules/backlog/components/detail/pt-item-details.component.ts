import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, ViewContainerRef, ViewChild } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

//import { ModalDialogOptions, ModalDialogService } from 'nativescript-angular';

import { PtItem, PtUser } from '../../../../shared/models/domain';
import { TextInputModalComponent } from '../../../../shared/modals/text-input/text-input.modal.component';
import { PtModalService } from '../../../../shared/modals/pt-modal.service';
import { PtModalContext } from '../../../../shared/models/ui/pt-modal-context.model';
import { PriorityEnum, StatusEnum } from '../../../../shared/models/domain/enums';
import { PtModalListModel } from '../../../../shared/models/ui/pt-modal-list.model';
import { enumValueIndex } from '../../../../shared/utils/enum-util';
import { PtModalListDisplayItem } from '../../../../shared/models/ui/pt-modal-list-display-item.model';


type EditingPropType = 'title' | 'description';

export class TicketOrder {
    public movie: number = 123;
    public date: string = "2016-04-06";
    public time: string = "20:00";
    public type: string = "2D";
    public price: number = 9.50;
    public numberOfTickets: number = 2;
    public contactName: string = null;
    public contactPhone: string = null;
    public contactEmail: string = null;
    public agreeTerms: boolean = false;

    constructor() {
    }
}

export class Movie {
    public id: number;
    public name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

export interface PtItemDetailsForm {
    title: string;
    description: string;
    type: PtItemType;
    estimate: number;
    priority: PriorityEnum;
    status: StatusEnum;
    assignee: PtUser;
}

import { PropertyConverter, DataFormEventData } from 'nativescript-pro-ui/dataform';
import { PtListDisplayItem } from '../../../../shared/models/ui/pt-list-display-item.model';
import { PT_ITEM_TYPE_DISPLAY_MAPPING, PT_ITEM_TYPES } from '../../../../shared/models/ui/pt-item-type.model.impl';
import { PtItemType } from '../../../../shared/models/domain/types';
import { RadDataFormComponent } from 'nativescript-pro-ui/dataform/angular';
import { PT_ITEM_STATUSES, PT_ITEM_PRIORITIES } from '../../../../shared/constants';


// >> angular-dataform-converters-code
export class MovieConverter implements PropertyConverter {
    constructor(private _movies: Array<Movie>) { }

    convertFrom(id: number) {
        return this._movies.filter((movie: Movie) => movie.id == id)[0].name;
    }

    convertTo(name: string) {
        return this._movies.filter((movie: Movie) => movie.name == name)[0].id;
    }
}



@Component({
    moduleId: module.id,
    selector: 'pt-item-details',
    templateUrl: 'pt-item-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtItemDetailsComponent implements OnInit {

    @Input() public item: PtItem;
    @Output() itemSaved = new EventEmitter<PtItem>();

    @ViewChild('itemDetailsDataForm') itemDetailsDataForm: RadDataFormComponent;


    public ticketOrder = new TicketOrder();
    public movies = new Array<Movie>();
    public movieConverter: MovieConverter;
    private _movieNames: Array<String>;
    public itemForm: PtItemDetailsForm;

    public itemTypesProvider = PT_ITEM_TYPES;
    public statusesProvider = PT_ITEM_STATUSES;
    public prioritiesProvider = ['Low', 'Medium'];


    public get movieNames() {
        if (!this._movieNames) {
            this._movieNames = this.movies.map((value: Movie) => value.name);
        }
        return this._movieNames;
    }


    constructor(
        //private modalService: ModalDialogService,
        private ptModalService: PtModalService,
        private vcRef: ViewContainerRef
    ) {
        this.movies.push(new Movie(123, "Zootopia"));
        this.movies.push(new Movie(217, "Captain America"));
        this.movies.push(new Movie(324, "The Jungle Book"));

        this.movieConverter = new MovieConverter(this.movies);
        //this.itemTypesProvider.items = this.ptModalService.enumToModalListDisplayItemArray(ItemTypeEnum);
        //this.statusesProvider.items = this.ptModalService.enumToModalListDisplayItemArray(StatusEnum);
    }

    public ngOnInit() {
        this.itemForm = {
            title: this.item.title,
            description: this.item.description ? this.item.description : '',
            type: this.item.type,
            priority: <PriorityEnum>'Low',
            estimate: this.item.estimate,
            status: this.item.status,
            assignee: this.item.assignee
        };
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
            items: [],
            selectedIndex: 0
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
}
