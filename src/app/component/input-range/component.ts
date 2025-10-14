import { Component } from '@angular/core';
import { RangeValueAccessor } from '../../hook/range_value_accessor';

@Component({
  selector: 'input[type=range]',
  template: '',
  standalone: true,
  hostDirectives: [RangeValueAccessor],
})
export class InputRangeFCC {
  readonly __isElement = true;
}
