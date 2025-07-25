import { Component, computed } from '@angular/core';
import { PiWrapperBaseComponent } from '@piying/view-angular';
import { setGlobalConfig, summarize } from 'valibot';
import '@valibot/i18n/zh-CN';
setGlobalConfig({ lang: 'zh-CN' });

@Component({
  selector: 'label-wrapper',
  templateUrl: './component.html',
})
export class LabelWC extends PiWrapperBaseComponent {


}
