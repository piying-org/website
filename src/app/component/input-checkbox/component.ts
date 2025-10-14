import { Component } from '@angular/core';
import { NumberValueAccessor } from '../../hook/number_value_accessor';
import { CheckboxControlValueAccessor } from '../../hook/checkbox_value_accessor';

@Component({
  selector: 'input[type=checkbox]',
  template: '',
  standalone: true,
  hostDirectives: [CheckboxControlValueAccessor],
})
export class InputCheckboxFCC {
  readonly __isElement = true;
}
