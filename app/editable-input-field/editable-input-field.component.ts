import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

const ENTER_KEY_CODE: number = 13;
const ESC_KEY_CODE: number = 7;

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditableInputFieldComponent
  implements OnInit, ControlValueAccessor {
  @Input() isEditing: boolean = false;

  @ViewChild("editableInput") input: ElementRef;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  public value: string;

  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    console.log("isEditing", this.isEditing);
  }

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
    this.cdr.markForCheck();
  }

  onInput(event) {
    this.onChange(this.value);
  }

  onBlur() {
    this.onTouched();
  }

  onKeyUp(event: KeyboardEvent) {
    console.log(event);
  }

  edit() {
    this.isEditing = true;
    // hack to make focus work
    setTimeout(() => this.input.nativeElement.focus());
  }
}
