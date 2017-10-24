import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { PtItem } from '../../../../shared/models/domain';


@Component({
    moduleId: module.id,
    selector: 'pt-list-item',
    templateUrl: 'pt-list-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtListItemComponent implements OnInit {

    @Input() item: PtItem;

    constructor() { }

    ngOnInit() { }
}
