import { Color } from 'color';
import { com } from '../../ui-data-form';

export function setStepperEditorContentOffset(_editor, _horizontalOffset: number, _verticalOffset: number): void { }

export function setStepperEditorTextPostfix(editor, singularPostfix: string, pluralPostfix: string): void {
    const numberPicker: com.telerik.widget.numberpicker.RadNumberPicker =
        <com.telerik.widget.numberpicker.RadNumberPicker>editor.getEditorView();

    const labelView = numberPicker.labelView();
    const numVal = parseInt(labelView.getText());
    if (numVal === 1) {
        labelView.setText(`1 ${singularPostfix}`);
    } else {
        labelView.setText(`${numVal} ${pluralPostfix}`);
    }
}

export function setStepperEditorColors(editor, lightColor: Color, darkColor: Color): void {

    const numberPicker: com.telerik.widget.numberpicker.RadNumberPicker =
        <com.telerik.widget.numberpicker.RadNumberPicker>editor.getEditorView();

    numberPicker.labelView().setTextColor(darkColor.android);
    numberPicker.decreaseView().setTextColor(darkColor.android);
    numberPicker.increaseView().setTextColor(darkColor.android);

    const background1 = new android.graphics.drawable.GradientDrawable();
    background1.setStroke(2, lightColor.android);
    numberPicker.rootView().setBackground(background1);

    const background2 = new android.graphics.drawable.GradientDrawable();
    background2.setStroke(2, lightColor.android);
    numberPicker.decreaseView().setBackground(background2);

    const background3 = new android.graphics.drawable.GradientDrawable();
    background3.setStroke(2, lightColor.android);
    numberPicker.increaseView().setBackground(background3);
}