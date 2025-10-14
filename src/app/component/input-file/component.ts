import { Component } from '@angular/core';
import { FileInputDirective } from '../file-input/file-input.directive';

@Component({
  selector: 'input[type=file]',
  template: '',
  standalone: true,
  hostDirectives: [FileInputDirective],
})
export class InputFileFCC {
  readonly __isElement = true;
}
