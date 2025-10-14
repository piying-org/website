import { Component, computed } from '@angular/core';
import { PiyingViewWrapperBase } from '@piying/view-angular';
import { fieldControlStatusClass } from '@piying/view-angular-core';
import { summarize } from 'valibot';

@Component({
  selector: 'valid-wrapper',
  templateUrl: './component.html',
})
export class ValidWC extends PiyingViewWrapperBase {
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
