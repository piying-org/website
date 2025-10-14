import { Component } from '@angular/core';
import { NumberValueAccessor } from '../../hook/number_value_accessor';

@Component({
  selector: 'input[type=number]',
  template: '',
  standalone: true,
  hostDirectives: [NumberValueAccessor],
})
export class InputNumberFCC {
  readonly __isElement = true;
}
