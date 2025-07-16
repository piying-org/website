import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  IsActiveMatchOptions,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { ExactMatchOptions, NavigationItem } from '../../../navigation.types';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'li[type=basic]',
  templateUrl: './basic.component.html',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive, NgTemplateOutlet, MatIcon],
})
export class LiBasicComponent {
  @Input() item!: NavigationItem;
  isActiveMatchOptions!: IsActiveMatchOptions;
  ngOnInit(): void {
    this.isActiveMatchOptions =
      this.item.activateMatchOptions ?? ExactMatchOptions;
  }
}
