import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PI_VIEW_FIELD_TOKEN, PiViewGroupBase } from '@piying/view-angular';

@Component({
  selector: 'valid-group',
  templateUrl: './component.html',
  imports: [NgTemplateOutlet],
})
export default class ValidFGC extends PiViewGroupBase {
  field = inject(PI_VIEW_FIELD_TOKEN);
}
