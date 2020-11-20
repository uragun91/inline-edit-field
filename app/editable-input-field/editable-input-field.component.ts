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

const ENTER_KEY_CODE: string = "Enter";
const ESC_KEY_CODE: string = "Escape";

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
  public valueToRestoreTo: string;

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
    this.valueToRestoreTo = value;
    this.cdr.markForCheck();
  }

  onInput(event) {
    this.onChange(this.value);
  }

  onBlur() {
    this.finishEdit();
  }

  onKeyUp(event: KeyboardEvent) {
    const keyCode: string = event.code;
    if ([ENTER_KEY_CODE, ESC_KEY_CODE].includes(event.code)) {
      if (keyCode === ENTER_KEY_CODE) {
        // commit
        this.valueToRestoreTo = this.value;
      } else if (keyCode === ESC_KEY_CODE) {
        // reset
        this.value = this.valueToRestoreTo;
      }

      this.finishEdit();
      this.onChange(this.value);
    }
  }

  edit() {
    this.isEditing = true;
    // hack to make focus work
    setTimeout(() => this.input.nativeElement.focus());
  }

  finishEdit() {
    this.isEditing = false;
    // hack to make focus work
    setTimeout(() => {
      this.input.nativeElement.blur();
      this.onTouched();
    });
  }
}
