import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { PtItem, PtComment } from '../../../../shared/models/domain';
import { PtNewComment } from '../../../../shared/models/index';

@Component({
    moduleId: module.id,
    selector: 'pt-item-chitchat',
    templateUrl: 'pt-item-chitchat.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PtItemChitchatComponent implements OnInit {

    constructor() { }

    public ngOnInit() { }

}
