import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { PtItem, PtComment } from '../../../../shared/models/domain';
import { PtNewComment } from '../../../../shared/models/dto';

@Component({
    moduleId: module.id,
    selector: 'pt-item-chitchat',
    templateUrl: 'pt-item-chitchat.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtItemChitchatComponent implements OnInit {

    @Input() public set item(val: PtItem) {
        this.comments = val.comments;
    }
    @Output() addNewComment = new EventEmitter<PtNewComment>();

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

}
