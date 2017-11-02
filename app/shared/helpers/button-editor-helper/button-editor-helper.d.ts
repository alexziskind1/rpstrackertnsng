import { CustomPropertyEditor } from "nativescript-pro-ui/dataform";

declare class ButtonEditorHelper {
    public buttonValue: number;
    public editor: CustomPropertyEditor;
    public updateEditorValue(editorView, newValue);
    public iosTapHandler();
}
