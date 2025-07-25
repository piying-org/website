import { Component, computed } from '@angular/core';
import { PiWrapperBaseComponent } from '@piying/view-angular';
import { fieldControlStatusClass } from '@piying/view-angular-core';
import { setGlobalConfig, summarize } from 'valibot';
import '@valibot/i18n/zh-CN';
setGlobalConfig({ lang: 'zh-CN' });

@Component({
  selector: 'valid-wrapper',
  templateUrl: './component.html',
})
export class ValidWC extends PiWrapperBaseComponent {
  errorStr$$ = computed(() => {
    const field = this.field$$();
    const valibot = field.form.root!.errors!['valibot'];
    if (valibot) {
      return summarize(valibot);
    } else {
      return Object.values(field.form.root!.errors!)
        .map((item) => (typeof item === 'string' ? item : JSON.stringify(item)))
        .join('\n');
    }
  });
  classStatus$$ = computed(() => {
    return fieldControlStatusClass(this.field$$().form.control);
  });
}
