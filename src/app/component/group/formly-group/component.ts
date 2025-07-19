import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  PI_VIEW_FIELD_TOKEN,
  PiResolvedViewFieldConfig,
  PiViewGroupBase,
} from '@piying/view-angular';
import { summarize } from 'valibot';

@Component({
  selector: 'formly-group',
  templateUrl: './component.html',
  imports: [NgTemplateOutlet],
})
export default class FormlyFGC extends PiViewGroupBase {
  field = inject(PI_VIEW_FIELD_TOKEN);

  errorStr = (field: PiResolvedViewFieldConfig) => {
    const valibot = field.form.control!.errors!['valibot'];
    return summarize(valibot);
  };
}
