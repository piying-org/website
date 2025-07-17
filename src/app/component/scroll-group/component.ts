import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PI_VIEW_FIELD_TOKEN, PiViewGroupBase } from '@piying/view-angular';

@Component({
  selector: 'scroll-group',
  templateUrl: './component.html',
  imports: [NgTemplateOutlet, FormsModule],
})
export default class ScrollFGC extends PiViewGroupBase {
  field = inject(PI_VIEW_FIELD_TOKEN);
  scrollHeight = input<number>(500);
  placeholerHeight = input<number>(20);
}
