import {
  AfterViewInit,
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Inject,
  OnDestroy,
  Renderer2
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Directive({
  selector:
    "[contenteditable][formControlName], [contenteditable][formControl], [contenteditable][ngModel]",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContenteditableValueAccessor),
      multi: true
    }
  ]
})
export class ContenteditableValueAccessor
  implements ControlValueAccessor, AfterViewInit, OnDestroy {
  // support for IE11
  private observer = new MutationObserver(() => {
    setTimeout(() => {
      this.onChange(ContenteditableValueAccessor.processValue(this.innerText));
    });
  });

  private onTouched = () => {};
  private onChange: (value: string) => void = () => {};

  private get innerText(): string {
    return this.elementRef.nativeElement.innerText;
  }

  constructor(
    @Inject(ElementRef) private readonly elementRef: ElementRef,
    @Inject(Renderer2) private readonly renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    this.observer.observe(this.elementRef.nativeElement, {
      characterData: true,
      childList: true,
      subtree: true
    });
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

  @HostListener("input")
  onInput() {
    // IE11 doesn't support input events. Disconnect obserer when first input event met
    this.observer.disconnect();
    this.onChange(ContenteditableValueAccessor.processValue(this.innerText));
  }

  @HostListener("blur")
  onBlur() {
    this.onTouched();
  }

  writeValue(value: string | null) {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      "innerHTML",
      ContenteditableValueAccessor.processValue(value)
    );
  }

  registerOnChange(onChange: (value: string) => void) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      "contenteditable",
      String(!disabled)
    );
  }

  private static processValue(value: string | null): string {
    // prevent outputtin null in ie11
    const processed = value || "";

    return processed.trim();
  }
}
