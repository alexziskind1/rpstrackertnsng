import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { RadSideDrawerComponent, SideDrawerType } from "nativescript-pro-ui/sidedrawer/angular";
import { RadSideDrawer, SideDrawerLocation } from 'nativescript-pro-ui/sidedrawer';

import { NavigationService } from '../../../../core/services';
import { BacklogService } from '../../services/backlog.service';
import { Store } from '../../../../core/state/app-store';
import { PtItem } from '../../../../core/models/domain';
import { PresetType } from '../../../../shared/models/ui/types';
import { PtModalService } from '../../../../shared/modals/pt-modal.service';
import { NewItemModalComponent } from '../../modals/new-item/new-item.modal.component';
import { PtNewItem } from '../../../../shared/models/dto';


@Component({
    moduleId: module.id,
    selector: 'pt-backlog',
    templateUrl: 'backlog.page.component.html',
    styleUrls: ['backlog.page.component.css']
})
export class BacklogPageComponent implements AfterViewInit, OnInit {

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    public items$: Observable<PtItem[]> = this.store.select<PtItem[]>('backlogItems');
    public selectedPreset$: Observable<PresetType> = this.store.select<PresetType>('selectedPreset');
    public isListRefreshing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private changeDetectionRef: ChangeDetectorRef,
        private activatedRoute: ActivatedRoute,
        private navigationService: NavigationService,
        private backlogService: BacklogService,
        private ptModalService: PtModalService,
        private store: Store,
        private vcRef: ViewContainerRef
    ) { }

    public ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this.drawer.drawerLocation = SideDrawerLocation.Right;
        this.changeDetectionRef.detectChanges();
    }

    public ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            const reqPreset = params['preset'];
            if (reqPreset) {
                this.store.set('selectedPreset', reqPreset);
            }
        });

        this.selectedPreset$.subscribe(next => {
            this.backlogService.fetchItems();
        });
    }

    public showSlideout() {
        this.drawer.mainContent.className = 'drawer-content-in';
        this.drawer.showDrawer();
    }

    public onDrawerClosing(args) {
        this.drawer.mainContent.className = 'drawer-content-out';
        //const mainContentLayout = (<LayoutBase>this._drawer.mainContent);
        //mainContentLayout.className = 'drawer-content-out';
    }

    public onCloseDrawerTap() {
        this.drawer.closeDrawer();
    }

    public onListRefreshRequested(notifyRefreshComplete: () => void) {
        this.isListRefreshing$.next(true);
        this.backlogService.fetchItems()
            .then(() => {
                this.isListRefreshing$.next(false);
            })
            .catch(() => {
                this.isListRefreshing$.next(false);
            });
    }

    public selectListItem(item: PtItem) {
        //this.navigationService.navigate(['detail', item.id]);

        //this.router.navigate(['detail', item.id]);
        // this.routerExtensions.navigate()
        const transition: NavigationTransition = {
            duration: 5000,
            name: 'flipRight'
        };
        const options: NavigationOptions = {
            animated: true,
            transition: transition
        };

        this.routerExtensions.navigate(['detail', item.id], options);
    }

    public onAddTap(args) {
        const ctx = this.ptModalService.createPtModalContext<any, PtNewItem>(this.vcRef, 'Add New Item', null, null, 'Save');
        this.ptModalService.createModal(NewItemModalComponent, ctx)
            .then(result => {
                if (result != null) {
                    this.backlogService.addNewPtItem(result, this.store.value.currentUser);
                }
            });
    }
}
