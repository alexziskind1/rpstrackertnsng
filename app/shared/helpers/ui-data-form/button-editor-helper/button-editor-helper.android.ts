import { CustomPropertyEditor } from 'nativescript-pro-ui/dataform';


export class ButtonEditorHelper {
    public buttonValue: string;
    public editor: CustomPropertyEditor;

    public updateEditorValue(editorView, newValue) {
        this.buttonValue = newValue;
        editorView.setText(this.buttonValue);
    }
}
