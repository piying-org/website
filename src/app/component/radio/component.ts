import { Component, computed, forwardRef, input } from '@angular/core';
import {
  DefaultOptionConvert,
  OptionConvert,
  ResolvedOption,
} from '../select/component';
import { BaseControl } from '../form/base.component';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './component.html',
  imports: [FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
})
export default class RadioComponent extends BaseControl {
  static index = 0;
  name = `radio-${RadioComponent.index++}`;
  options = input<any[]>([]);
  optionConvert = input<OptionConvert, Partial<OptionConvert>>(
    DefaultOptionConvert,
    {
      transform: (input) => ({ ...DefaultOptionConvert, ...input }),
    },
  );
  resolvedOptions$$ = computed(() => this.transformOptions(this.options()));
  transformOptions(options: any[]): ResolvedOption[] {
    return options.map((option) => {
      const resolvedItem: ResolvedOption = {
        label: this.optionConvert().label(option),
        value: this.optionConvert().value(option),
        disabled: this.optionConvert().disabled?.(option) ?? false,
        type: 'option',
      };
      return resolvedItem;
    });
  }
}
