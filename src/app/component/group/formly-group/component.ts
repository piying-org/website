import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import {
  PI_VIEW_FIELD_TOKEN,
  PiResolvedViewFieldConfig,
  PiyingViewGroupBase,
} from '@piying/view-angular';
import { summarize } from 'valibot';
import '@valibot/i18n/fr';

@Component({
  selector: 'formly-group',
  templateUrl: './component.html',
  imports: [NgTemplateOutlet],
})
export default class FormlyFGC extends PiyingViewGroupBase {
  field = inject(PI_VIEW_FIELD_TOKEN);
  wrapperClass = input<any>();
  errorStr = (field: PiResolvedViewFieldConfig) => {
    const valibot = field.form.control!.errors!['valibot'];
    if (valibot) {
      return summarize(valibot);
    } else {
      return Object.values(field.form.control!.errors!)
        .map((item) => (typeof item === 'string' ? item : JSON.stringify(item)))
        .join('\n');
    }
  };
}
