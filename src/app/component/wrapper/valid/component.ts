import { Component, computed, inject } from '@angular/core';
import { InsertFieldDirective, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
import { fieldControlStatusClass } from '@piying/view-angular-core';
import { summarize } from 'valibot';

@Component({
  selector: 'valid-wrapper',
  templateUrl: './component.html',
  imports: [InsertFieldDirective],
})
export class ValidWC {
  field$$ = inject(PI_VIEW_FIELD_TOKEN);
  props$$ = computed(() => this.field$$().props());
  errorStr$$ = computed(() => {
    const field = this.field$$();
    const valibot = field.form.control!.errors!['valibot'];
    if (valibot) {
      return summarize(valibot);
    } else {
      return Object.values(field.form.control!.errors!)
        .map((item) => (typeof item === 'string' ? item : JSON.stringify(item)))
        .join('\n');
    }
  });
  classStatus$$ = computed(() =>
    fieldControlStatusClass(this.field$$().form.control),
  );
  isChangedStatus$$ = computed(
    () =>
      this.field$$().form.control?.dirty$$() ||
      this.field$$().form.control?.touched$$(),
  );
}
