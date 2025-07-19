import {
  Directive,
  ElementRef,
  inject,
  input,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[focus]',
})
export class FocusDirective {
  selector = input<string>();
  focus = input<boolean>();
  #el = inject<ElementRef<HTMLElement>>(ElementRef);
  ngOnChanges(changes: SimpleChanges): void {
    if (this.focus()) {
      let selector = this.selector();
      if (selector) {
        (this.#el.nativeElement.querySelector(selector) as HTMLElement).focus();
      } else {
        this.#el.nativeElement.focus();
      }
    }
  }
}
