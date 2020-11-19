import { Component, forwardRef, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-editable-input-field",
  templateUrl: "./editable-input-field.component.html",
  styleUrls: ["./editable-input-field.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditableInputFieldComponent),
      multi: true
    }
  ]
})
export class EditableInputFieldComponent
  implements OnInit, ControlValueAccessor {
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  public value: string;

  constructor() {}

  ngOnInit() {}

  registerOnChange(fn: (value: string) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  writeValue(value: string) {
    if (!value || typeof value !== "string") {
      return;
    }
    this.value = value;
  }

  onInput(event) {
    this.onChange(this.value);
  }
}
