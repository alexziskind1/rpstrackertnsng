import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { TextField } from 'ui/text-field';

import { PtItem, PtTask } from '../../../../../core/models/domain';
import { PtNewTask, PtTaskUpdate } from '../../../../../shared/models/dto';
import { DictType } from '../../../../../core/models/types';


@Component({
    moduleId: module.id,
    selector: 'pt-item-tasks',
    templateUrl: 'pt-item-tasks.component.html',
    styleUrls: ['pt-item-tasks.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PtItemTasksComponent implements OnInit {

    @Input() public set item(val: PtItem) {
        this.tasks = val.tasks;
    }
    @Output() addNewTask = new EventEmitter<PtNewTask>();
    @Output() updateTask = new EventEmitter<PtTaskUpdate>();

    public tasks: PtTask[] = [];
    public newTaskTitle = '';

    private lastUpdatedTitle = '';

    constructor() { }

    public ngOnInit() { }

    public onAddTapped(newTaskTextField: TextField, args) {
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
        newTaskTextField.dismissSoftInput();
    }

    public toggleTapped(task: PtTask) {
        const taskUpdate: PtTaskUpdate = {
            task: task,
            toggle: true
        };
        this.updateTask.emit(taskUpdate);
    }

    public taskTitleChange(task: PtTask, newTitle: string) {
        if (task.title === newTitle) {
            return;
        }
        this.lastUpdatedTitle = newTitle;
    }

    public taskBlurred(task: PtTask) {
        if (task.title === this.lastUpdatedTitle) {
            return;
        }
        const taskUpdate: PtTaskUpdate = {
            task: task,
            toggle: false,
            newTitle: this.lastUpdatedTitle
        };
        this.updateTask.emit(taskUpdate);
        this.lastUpdatedTitle = '';
    }

}
