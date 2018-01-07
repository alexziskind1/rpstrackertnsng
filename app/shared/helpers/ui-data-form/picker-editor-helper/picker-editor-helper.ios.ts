export function setPickerEditorImageLocation(editor) {
    const labelDef = editor.gridLayout.definitionForView(editor.textLabel);
    const imageDef = editor.gridLayout.definitionForView(editor.imageView);
    labelDef.column = 0;
    imageDef.column = 1;
}
