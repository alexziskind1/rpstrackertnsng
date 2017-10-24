import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

import { MenuComponent } from './components/menu/menu.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { TextInputModalComponent } from './modals/text-input.modal.component';


@NgModule({
    imports: [
        CommonModule,
        NativeScriptFormsModule
    ],
    exports: [
        MenuComponent,
        DialogComponent
    ],
    declarations: [
        MenuComponent,
        DialogComponent,
        TextInputModalComponent
    ],
    providers: [],
    entryComponents: [
        TextInputModalComponent
    ]
})
export class SharedModule { }
