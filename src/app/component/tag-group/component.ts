import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { PI_VIEW_FIELD_TOKEN, PiyingViewGroupBase } from '@piying/view-angular';

@Component({
  selector: 'tabs-group',
  templateUrl: './component.html',
  imports: [NgTemplateOutlet],
})
export default class TabsFGC extends PiyingViewGroupBase {
  field = inject(PI_VIEW_FIELD_TOKEN);
  static index = 0;
  name = `tabs-group-${TabsFGC.index++}`;
  stepsLike = input<boolean>(false);
}
