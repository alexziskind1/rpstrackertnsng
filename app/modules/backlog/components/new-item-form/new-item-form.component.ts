import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PtNewItem } from '../../../../shared/models';
import { ItemTypeEnum } from '../../../../shared/enums';

@Component({
    moduleId: module.id,
    selector: 'pt-new-item-form',
    templateUrl: 'new-item-form.component.html'
})

export class NewItemFormComponent implements OnInit {


    constructor() { }

    public ngOnInit() {

    }

}
