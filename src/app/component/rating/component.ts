import { Component, computed, forwardRef, input } from '@angular/core';
import { BaseControl } from '../form/base.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'div[type=rating]',
  templateUrl: './component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true,
    },
  ],
  imports: [],
})
export class RatingComponent extends BaseControl {
  static index = 0;
  name = `rating-${RatingComponent.index++}`;
  count = input(5);
  list = computed(() => new Array(this.count()).fill(undefined));
}
