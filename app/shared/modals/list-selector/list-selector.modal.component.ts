import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';

//import { Observable } from 'rxjs/Observable';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
//import { Subscription } from 'rxjs/Subscription';



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
    //public items$: BehaviorSubject<PtModalListDisplayItem[]> = new BehaviorSubject([]);
    private originalSelectedIndex: number = 0;
    private selectedIndex: number = 0;
    //private itemsSub$: Subscription;


    constructor(
        params: ModalDialogParams,
        page: Page,
        zone: NgZone
    ) {
        super(params, page);
        if (this.payload.selectedIndex) {
            this.originalSelectedIndex = this.payload.selectedIndex;
            this.selectedIndex = this.payload.selectedIndex;
        }
        this.items = this.payload.items;
        /*
        setTimeout(() => {
            this.items = this.payload.items;
        }, 500);

        zone.run(() => {
            this.items = this.payload.items;
        });
*/


        /*
                this.payload.loadItemsTrigger()
                    .then(() => {
                        this.itemsSub$ = this.payload.items$.subscribe(theItems => {
                            this.items$.next(theItems);
                        });
        
        
                        this.itemsSub$ = this.payload.items$
                            .subscribe(theItems => {
                                this.items = theItems.map((item, idx): PtModalListDisplayItem => {
                                    return {
                                        key: item.key,
                                        value: item.value,
                                        img: item.img,
                                        isSelected: idx === this.selectedIndex ? true : false,
                                        payload: item.payload
                                    };
                                });
                            });
                            
                    });
        */
    }

    public ngOnInit() {

    }

    public ngOnDestroy() {
        //this.itemsSub$.unsubscribe();
    }

    public onItemSelected(args): void {
        const oldSelectedItem = this.items[this.selectedIndex];
        //const oldSelectedItem = this.items$.value[this.selectedIndex];
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
