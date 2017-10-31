import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { RadSideDrawerComponent, SideDrawerType } from "nativescript-pro-ui/sidedrawer/angular";
import { RadSideDrawer, SideDrawerLocation } from 'nativescript-pro-ui/sidedrawer';

import { NavigationService } from '../../../../core/services';
import { BacklogService } from '../../backlog.service';
import { Store } from '../../../../core/app-store';
import { PtItem } from '../../../../shared/models/domain';
import { PresetType } from '../../../../shared/models/ui/types';
import { PtNewItem } from '../../../../shared/models/forms';



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

    public showAddItemDialog = false;

    constructor(
        private changeDetectionRef: ChangeDetectorRef,
        private activatedRoute: ActivatedRoute,
        private navigationService: NavigationService,
        private backlogService: BacklogService,
        private store: Store
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

    public selectListItem(item: PtItem) {
        this.navigationService.navigate(['/detail', item.id]);
    }

    public onAddTap(args) {
        this.showAddItemDialog = !this.showAddItemDialog;
    }

    public onAddDialogCloseTap(args) {
        this.showAddItemDialog = !this.showAddItemDialog;
    }

    public onNewItemFormDone(newItem: PtNewItem) {
        if (newItem != null) {
            this.backlogService.addNewPtItem(newItem, this.store.value.currentUser);
        }
        this.showAddItemDialog = !this.showAddItemDialog;
    }

    public onLogoutTap(args) {
        this.navigationService.navigate(['/auth', 'logout']);
    }

}
