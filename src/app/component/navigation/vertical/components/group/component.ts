import { NgTemplateOutlet } from '@angular/common';
import { Component, input, TemplateRef } from '@angular/core';

import { NavigationItem } from '../../../navigation.types';

@Component({
  selector: 'li[type=group]',
  templateUrl: './component.html',
  standalone: true,
  imports: [NgTemplateOutlet],
})
export class LiGroupComponent {
  item = input.required<NavigationItem>();
  itemTemplate = input.required<TemplateRef<any>>();
}
