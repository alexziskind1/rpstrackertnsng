import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { PtItem } from '../../../../core/models/domain';
import { ItemEventData } from 'ui/list-view';

@Component({
    moduleId: module.id,
    selector: 'pt-list',
    templateUrl: 'pt-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtListComponent implements OnInit {

    @Input() items: PtItem[];
    @Output() listItemSelected: EventEmitter<PtItem> = new EventEmitter<PtItem>();

    constructor() { }

    ngOnInit() { }

    public listItemTap(args: ItemEventData) {
        let lv = args.object;
        let item = <PtItem>(<any>lv).items[args.index];
        this.listItemSelected.emit(item);
    }
}
