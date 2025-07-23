import { Component, computed, input } from '@angular/core';
import { PiWrapperBaseComponent } from '@piying/view-angular';
import { summarize } from 'valibot';

@Component({
  selector: 'app-formly-field-wrapper',
  templateUrl: './component.html',
})
export class FormlyFieldWC extends PiWrapperBaseComponent {
  errorStr$$ = computed(() => {
    const field = this.field$$();
    const valibot = field.form.control!.errors!['valibot'];
    return summarize(valibot);
  });
}
