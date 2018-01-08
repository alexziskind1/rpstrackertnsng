import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-dialog',
    templateUrl: 'dialog.component.html'
})
export class DialogComponent {
    @Input() closable = true;
    @Input() visible: boolean;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }
}
