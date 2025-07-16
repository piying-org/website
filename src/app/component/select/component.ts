import { Component, input } from '@angular/core';
export interface Option1 {
  label: string;
  value: string;
  disabled?: boolean;
}
export type Option2 = string;
@Component({
  selector: 'select',
  templateUrl: './component.html',
})
export class SelectComponent {
  emptyContent = input<string>('------');
  options = input<Option1[], Option1[] | Option2[]>([], {
    transform: (input) => {
      if (typeof input?.[0] === 'string') {
        return input.map((item) => ({ label: item, value: item }));
      }
      return input as any;
    },
  });
}
