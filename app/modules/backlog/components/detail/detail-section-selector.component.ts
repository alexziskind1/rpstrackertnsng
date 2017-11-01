import { Component, EventEmitter, OnInit, Output, ChangeDetectionStrategy, Input } from '@angular/core';
import { DetailScreenType } from '../../../../shared/models/ui/types';

@Component({
    moduleId: module.id,
    selector: 'pt-detail-section-selector',
    template: `
    <FlexboxLayout class="selector">
        <Button (tap)="onDetailsTap($event)" text="Details" class="selector-btn" [class.active]="selectedScreen === 'details'"></Button>
        <Button (tap)="onTasksTap($event)" text="Tasks" class="selector-btn" [class.active]="selectedScreen === 'tasks'"></Button>
        <Button (tap)="onChitchatTap($event)" text="Chitchat" class="selector-btn" [class.active]="selectedScreen === 'chitchat'"></Button>
    </FlexboxLayout>
    `,
    styleUrls: ['detail-section-selector.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailSectionSelectorComponent implements OnInit {

    @Input() selectedScreen: DetailScreenType = 'details';
    @Output() screenSelected = new EventEmitter<DetailScreenType>();

    constructor() { }

    ngOnInit() { }

    public onDetailsTap(args) {
        this.screenSelected.emit('details');
    }
    public onTasksTap(args) {
        this.screenSelected.emit('tasks');
    }
    public onChitchatTap(args) {
        this.screenSelected.emit('chitchat');
    }
}
