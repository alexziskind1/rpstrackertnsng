import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { isIOS } from 'platform';

import { PtItem, PtComment, PtUser } from '../../../../../core/models/domain';
import { PtNewComment } from '../../../../../shared/models/dto';


@Component({
    moduleId: module.id,
    selector: 'pt-item-chitchat',
    templateUrl: 'pt-item-chitchat.component.html',
    styleUrls: ['pt-item-chitchat.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtItemChitchatComponent implements OnInit {



    @Input() public set item(val: PtItem) {
        this.comments = val.comments;
    }
    @Input() public currentUser: PtUser;

    @Output() addNewComment = new EventEmitter<PtNewComment>();


    public get currentUserAvatar() {
        return this.currentUser.avatar;
    }

    public comments: PtComment[] = [];

    public newCommentText = '';

    constructor() { }

    public ngOnInit() { }

    public onAddTapped(args) {
        const newTitle = this.newCommentText.trim();
        if (newTitle.length === 0) {
            return;
        }
        const newComment: PtNewComment = {
            title: newTitle
        };
        this.addNewComment.emit(newComment);
        this.newCommentText = '';
        // newTaskTV.dismissSoftInput();
    }

    public commentHeight(commentTitle: string) {
        const lineHeight = isIOS ? 20 : 30;
        const numlines = Math.ceil(commentTitle.length / 22);
        return ((numlines < 2 ? 2 : numlines) * lineHeight) + 10;
    }

}
