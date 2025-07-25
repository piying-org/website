import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, forwardRef, input } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControl } from '../form/base.component';
export interface Option1 {
  label: string;
  value: any;
  disabled?: boolean;
  type?: 'option';
}
export interface OptionGroup {
  disabled?: boolean;
  label: string;
  children: Option1[];
  type: 'group';
}
export interface ResolvedOption {
  label: string;
  value: any;
  disabled?: boolean;
  type: 'option' | 'group';
  children?: ResolvedOption[];
}
export interface OptionConvert {
  label: (input: any) => string;
  value: (input: any) => any;
  isGroup: (input: any) => boolean;
  children: (input: any) => any[];
  disabled?: (input: any) => boolean;
}
export type Option2 = string;

export const DefaultOptionConvert: OptionConvert = {
  label: (item) => (typeof item === 'string' ? item : item.label),
  value: (item) => (typeof item === 'string' ? item : item.value),
  disabled: (item) => typeof item === 'object' && item.disabled,
  isGroup: (item) => typeof item === 'object' && item.type === 'group',
  children: (item) => item.children,
};
@Component({
  selector: 'app-select',
  templateUrl: './component.html',
  imports: [NgTemplateOutlet, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent extends BaseControl {
  multiple = input<boolean>(false);
  emptyContent = input<string>('------');
  optionConvert = input<OptionConvert, Partial<OptionConvert>>(
    DefaultOptionConvert,
    {
      transform: (input) => ({ ...DefaultOptionConvert, ...input }),
    },
  );
  options = input<(Option1 | OptionGroup)[]>([]);
  resolvedOptions$$ = computed(() => this.transformOptions(this.options()));
  transformOptions(options: any[]): ResolvedOption[] {
    return options.map((option) => {
      const resolvedItem: ResolvedOption = {
        label: this.optionConvert().label(option),
        value: this.optionConvert().value(option),
        disabled: this.optionConvert().disabled?.(option) ?? false,
        type: 'option',
      };
      if (this.optionConvert().isGroup(option)) {
        resolvedItem.type = 'group';
        resolvedItem.children = this.transformOptions(
          this.optionConvert().children(option),
        );
        return resolvedItem;
      }
      return resolvedItem;
    });
  }
}
