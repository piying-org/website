import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControl } from '../form/base.component';

@Directive({
  selector: 'input[type=file]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileInputDirective),
      multi: true,
    },
  ],
})
export class FileInputDirective extends BaseControl {
  #el = inject<ElementRef<HTMLInputElement>>(ElementRef);
  @HostListener('change')
  fileChanged() {
    this.valueChange(this.#el.nativeElement.files);
  }
}
