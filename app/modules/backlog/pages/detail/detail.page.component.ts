import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { PtItem, PtTask, PtUser } from '../../../../shared/models/domain';
import { BacklogService } from '../../backlog.service';
import { PtUserService } from '../../../../core/services';
import { Store } from '../../../../core/app-store';
import { PtNewTask, PtNewComment } from '../../../../shared/models/forms';

@Component({
    moduleId: module.id,
    selector: 'pt-backlog-detail-page',
    templateUrl: 'detail.page.component.html'
})
export class DetailPageComponent implements OnInit {

    public selectedDetailsScreenIndex = 0;

    public currentSelectedItem$: Observable<PtItem> = this.store.select<PtItem>('currentSelectedItem');

    public users$: Observable<PtUser[]> = this.store.select<PtUser[]>('users');

    constructor(
        private activatedRoute: ActivatedRoute,
        private backlogService: BacklogService,
        private ptUserService: PtUserService,
        private store: Store
    ) { }


    public ngOnInit() {
        this.backlogService.getItemFromCacheOrServer(parseInt(this.activatedRoute.snapshot.params['id']));
    }

    public onDetailsTap(args) {
        this.selectedDetailsScreenIndex = 0;
    }
    public onTasksTap(args) {
        this.selectedDetailsScreenIndex = 1;
    }
    public onChitchatTap(args) {
        this.selectedDetailsScreenIndex = 2;
    }

    public onUsersRequested() {
        this.ptUserService.fetchUsers();
    }

    public onItemSaved(item: PtItem) {
        this.backlogService.updatePtItem(item);
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
