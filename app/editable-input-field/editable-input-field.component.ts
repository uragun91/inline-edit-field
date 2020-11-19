import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild
} from "@angular/core";
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
  @Input() isEditing: boolean = false;

  @ViewChild("editableInput") input: ElementRef;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  public value: string;

  constructor(private renderer: Renderer2) {}

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

  onBlur() {
    this.onTouched();
  }

  edit() {
    this.isEditing = true;
    this.input.nativeElement.focus();
  }
}
