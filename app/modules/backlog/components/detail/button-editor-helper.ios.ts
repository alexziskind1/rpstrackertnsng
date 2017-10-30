import { CustomPropertyEditor } from "nativescript-pro-ui/dataform";


export class ButtonEditorHelper extends NSObject {
    public buttonValue: number;
    public editor: CustomPropertyEditor;
    public iosTapHandler;

    public updateEditorValue(editorView, newValue) {
        this.buttonValue = newValue;
        editorView.setTitleForState(this.buttonValue, UIControlState.Normal);
    }

    public "handleTap:"(sender) {
        this.iosTapHandler();
        //var newValue = this.buttonValue + 1;
        //this.updateEditorValue(sender, newValue);
        //this.editor.notifyValueChanged();
    }

    public static ObjCExposedMethods = {
        "handleTap:": { returns: interop.types.void, params: [UIView.class()] }
    };
}

