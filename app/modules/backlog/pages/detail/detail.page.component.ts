import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SegmentedBar, SegmentedBarItem } from 'ui/segmented-bar';
import { confirm, action, ActionOptions, ConfirmOptions } from 'ui/dialogs';

import { PtItem, PtTask, PtUser } from '../../../../shared/models/domain';
import { BacklogService } from '../../services/backlog.service';
import { PtUserService, NavigationService } from '../../../../core/services';
import { Store } from '../../../../core/state/app-store';
import { PtNewTask, PtNewComment } from '../../../../shared/models/dto';
import { DetailScreenType } from '../../../../shared/models/ui/types';

@Component({
    moduleId: module.id,
    selector: 'pt-backlog-detail-page',
    templateUrl: 'detail.page.component.html'
})
export class DetailPageComponent implements OnInit {

    public selectedDetailsScreen: DetailScreenType = 'details';
    public currentSelectedItem$: Observable<PtItem> = this.store.select<PtItem>('currentSelectedItem');
    public users$: Observable<PtUser[]> = this.store.select<PtUser[]>('users');

    constructor(
        private activatedRoute: ActivatedRoute,
        private backlogService: BacklogService,
        private ptUserService: PtUserService,
        private navigationService: NavigationService,
        private store: Store
    ) { }


    public ngOnInit() {
        this.backlogService.getItemFromCacheOrServer(parseInt(this.activatedRoute.snapshot.params['id']));
    }

    public onNavBackTap() {
        this.navigationService.backToPreviousPage();
    }

    public onDeleteTap() {
        //Simple approach
        //if (confirm('Are you sure you want to delete this item?')) {

        //}

        //Better approach with promise
        var options: ConfirmOptions = {
            title: "Delete Item",
            message: "Are you sure you want to delete this item?",
            okButtonText: "Yes",
            cancelButtonText: "Cancel"
        };
        //confirm without options, with promise
        //confirm('Are you sure you want to delete this item?')
        //confirm with options, with promise
        confirm(options)
            .then((result: boolean) => {
                // result can be true/false/undefined
                if (result) {
                    this.backlogService.deletePtItem(this.store.value.currentSelectedItem);
                    setTimeout(() => {
                        this.navigationService.backToPreviousPage();
                    }, 100);
                }
            });
    }

    public onScreenSelected(screen: DetailScreenType) {
        this.selectedDetailsScreen = screen;
    }

    public onUsersRequested() {
        this.ptUserService.fetchUsers();
    }

    public onItemSaved(item: PtItem) {
        this.backlogService.updatePtItem(item);
        //this.navigationService.backToPreviousPage();
    }

    public onAddNewTask(newTask: PtNewTask) {
        this.backlogService.addNewPtTask(newTask, this.store.value.currentSelectedItem);
    }

    public onToggleTask(task: PtTask) {
        this.backlogService.togglePtTask(task, this.store.value.currentSelectedItem);
    }

    public onAddNewComment(newComment: PtNewComment) {
        this.backlogService.addNewPtComment(newComment, this.store.value.currentSelectedItem);
    }
}
