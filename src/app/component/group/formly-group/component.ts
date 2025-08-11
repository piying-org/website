import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import {
  PiResolvedViewFieldConfig,
  PiyingViewGroupBase,
} from '@piying/view-angular';
import { summarize } from 'valibot';
import '@valibot/i18n/fr';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'formly-group',
  templateUrl: './component.html',
  imports: [NgTemplateOutlet, MatIcon],
})
export default class FormlyFGC extends PiyingViewGroupBase {
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
  add() {
    this.field$$().action.set(undefined);
  }
  remove(index: number) {
    this.field$$().action.remove(index);
  }
}
