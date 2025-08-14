import { Component, forwardRef, inject, input } from '@angular/core';
import { PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
import { BaseControl } from '../form/base.component';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './component.html',
  imports: [FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent extends BaseControl {
  position = input<'start' | 'end'>('end');
  field = inject(PI_VIEW_FIELD_TOKEN);
}
