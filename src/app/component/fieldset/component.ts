import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  PI_VIEW_FIELD_TOKEN,
  PiViewGroupBase,
} from '@piying/view-angular';

@Component({
  selector: 'fieldset-group',
  templateUrl: './component.html',
  imports: [NgTemplateOutlet],
})
export class FieldsetFGC extends PiViewGroupBase {
  field = inject(PI_VIEW_FIELD_TOKEN);
}
