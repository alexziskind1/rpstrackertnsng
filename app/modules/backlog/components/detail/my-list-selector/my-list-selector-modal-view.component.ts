import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

@Component({
    selector: "MyListSelectorModalView",
    moduleId: module.id,
    templateUrl: "my-list-selector-modal-view.component.html"
})
export class MyListSelectorModalViewComponent {

    public frameworks: Array<string>;

    public constructor(private params: ModalDialogParams) {
        this.frameworks = params.context.items;
    }

    public close(res: string) {
        this.params.closeCallback(res);
    }

}
