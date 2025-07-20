import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
export interface Option1 {
  label: string;
  value: string;
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
  value: string;
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

const DefaultOptionConvert: OptionConvert = {
  label: (item) => (typeof item === 'string' ? item : item.label),
  value: (item) => (typeof item === 'string' ? item : item.value),
  disabled: (item) => typeof item === 'object' && item.disabled,
  isGroup: (item) => typeof item === 'object' && item.type === 'group',
  children: (item) => item.children,
};
@Component({
  selector: 'select',
  templateUrl: './component.html',
  imports: [NgTemplateOutlet],
})
export class SelectComponent {
  emptyContent = input<string>('------');
  optionConvert = input<OptionConvert, Partial<OptionConvert>>(
    DefaultOptionConvert,
    {
      transform: (input) => {
        return { ...DefaultOptionConvert, ...input };
      },
    },
  );
  options = input<(Option1 | OptionGroup)[]>([]);
  resolvedOptions$$ = computed(() => {
    return this.transformOptions(this.options());
  });
  transformOptions(options: any[]): ResolvedOption[] {
    return options.map((option) => {
      let resolvedItem: ResolvedOption = {
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
