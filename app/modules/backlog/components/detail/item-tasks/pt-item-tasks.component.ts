import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { PtItem, PtTask } from '../../../../../core/models/domain';
import { PtNewTask } from '../../../../../shared/models/dto';


@Component({
    moduleId: module.id,
    selector: 'pt-item-tasks',
    templateUrl: 'pt-item-tasks.component.html',
    styles: [
        `
            .task-checkbox {
                width: 20;
                height: 20;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PtItemTasksComponent implements OnInit {

    @Input() public set item(val: PtItem) {
        this.tasks = val.tasks;
    }
    @Output() addNewTask = new EventEmitter<PtNewTask>();
    @Output() toggleTask = new EventEmitter<PtTask>();

    public tasks: PtTask[] = [];

    public newTaskTitle = '';

    constructor() { }

    public ngOnInit() { }

    public onAddTapped(args) {
        const newTitle = this.newTaskTitle.trim();
        if (newTitle.length === 0) {
            return;
        }
        const newTask: PtNewTask = {
            title: newTitle,
            completed: false
        };
        this.addNewTask.emit(newTask);
        this.newTaskTitle = '';
        // newTaskTV.dismissSoftInput();
    }

    public toggleTapped(task: PtTask) {
        this.toggleTask.emit(task);
    }

}
