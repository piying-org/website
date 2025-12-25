import { Component, computed, inject } from '@angular/core';
import { InsertFieldDirective, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
import { summarize } from 'valibot';

@Component({
  selector: 'app-formly-field-wrapper',
  templateUrl: './component.html',
  imports: [InsertFieldDirective],
})
export class FormlyFieldWC {
  field$$ = inject(PI_VIEW_FIELD_TOKEN);
  props$$ = computed(() => this.field$$().props());
  errorStr$$ = computed(() => {
    const field = this.field$$();
    const valibot = field.form.control!.errors!['valibot'];
    return summarize(valibot);
  });
}
