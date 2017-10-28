import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';



import { ModalDialogParams } from 'nativescript-angular';
import { Page } from 'ui/page';
import { PtBaseModalComponent } from '../pt-base.modal.component';
import { PtModalListModel } from '../../models/ui/pt-modal-list.model';
import { PtModalListDisplayItem } from '../../models/ui/pt-modal-list-display-item.model';


@Component({
    moduleId: module.id,
    selector: 'pt-list-selector-modal',
    templateUrl: 'list-selector.modal.component.html',
    styleUrls: ['list-selector.modal.component.css']
})
export class ListSelectorModalComponent extends PtBaseModalComponent<PtModalListModel<PtModalListDisplayItem>, number> implements OnInit, OnDestroy {
    public items: PtModalListDisplayItem[] = [];
    private originalSelectedIndex: number = 0;
    private selectedIndex: number = 0;
    private itemsSub$: Subscription;

    constructor(
        params: ModalDialogParams,
        page: Page
    ) {
        super(params, page);
    }

    public ngOnInit() {
        if (this.payload.selectedIndex) {
            this.originalSelectedIndex = this.payload.selectedIndex;
            this.selectedIndex = this.payload.selectedIndex;
        }

        this.payload.loadItemsTrigger()
            .then(() => {
                this.itemsSub$ = this.payload.items$
                    .subscribe(theItems => {
                        for (let i = 0; i < theItems.length; i++) {
                            this.items.push({
                                title: theItems[i].title,
                                value: theItems[i].value,
                                img: theItems[i].img,
                                isSelected: i === this.selectedIndex ? true : false,
                                payload: theItems[i].payload
                            });
                        }
                    });
            });
    }

    public ngOnDestroy() {
        this.itemsSub$.unsubscribe();
    }

    public onItemSelected(args): void {
        const oldSelectedItem = this.items[this.selectedIndex];
        oldSelectedItem.isSelected = false;

        const newSelectedItem = this.items[args.index];
        newSelectedItem.isSelected = true;
        this.selectedIndex = args.index;

        this.closeCallback(newSelectedItem.payload);
    }

    public onCancelButtonTap(): void {
        this.closeCallback(this.modalContext.defaultResult);
    }
}
