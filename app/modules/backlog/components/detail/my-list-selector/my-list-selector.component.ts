import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from "@angular/core";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";


import { MyListSelectorModalViewComponent } from "./my-list-selector-modal-view.component";
import { PtItem } from "../../../../../shared/models/domain";
import { BacklogService } from "../../../../backlog/backlog.service";


@Component({
    moduleId: module.id,
    selector: "MyListSelector",
    templateUrl: "my-list-selector.component.html"
})
export class MyListSelectorComponent implements OnInit {
    @Input() items: Array<string>;
    @Input() selectedValue: string;
    @Output() selectedValueChange = new EventEmitter<string>();

    constructor(
        private _modalService: ModalDialogService,
        private _vcRef: ViewContainerRef
    ) { }

    ngOnInit(): void {

    }

    onSelectorTap(): void {
        const title = `Select  Framework 1`;
        const selectedIndex = this.items.indexOf(this.selectedValue);
        const options: ModalDialogOptions = {
            viewContainerRef: this._vcRef,
            context: {
                items: this.items,
                title,
                selectedIndex
            },
            fullscreen: false
        };

        this._modalService.showModal(MyListSelectorModalViewComponent, options)
            .then((selectedValue: string) => {
                if (selectedValue) {
                    this.selectedValue = selectedValue;
                    this.selectedValueChange.emit(this.selectedValue);
                }
            });
    }
}
