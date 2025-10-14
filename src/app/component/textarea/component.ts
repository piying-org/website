import { Component } from '@angular/core';
import { DefaultValueAccessor } from '../../hook/default_value_accessor';

@Component({
  selector: 'textarea',
  template: '',
  standalone: true,
  hostDirectives: [DefaultValueAccessor],
})
export class TextareaFCC {
  readonly __isElement = true;
}
