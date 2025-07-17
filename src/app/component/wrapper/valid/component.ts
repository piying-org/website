import { Component, computed } from '@angular/core';
import { PiWrapperBaseComponent } from '@piying/view-angular';
import { setGlobalConfig, summarize } from 'valibot';
import '@valibot/i18n/zh-CN';
setGlobalConfig({ lang: 'zh-CN' });

@Component({
  selector: 'valid-wrapper',
  templateUrl: './component.html',
})
export class ValidWC extends PiWrapperBaseComponent {
  errorStr$$ = computed(() => {
    let field = this.field$$();
    let valibot = field.form.control!.errors!['valibot'];
    return summarize(valibot);
  });
}
