import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
import JSONFormatter from 'json-formatter-js';

@Component({
  selector: '',
  templateUrl: './component.html',
})
export default class FormHelperComponent {
  anchor = viewChild<ElementRef<HTMLElement>>('anchor');
  field = inject(PI_VIEW_FIELD_TOKEN);
  value = computed(() => this.field().form.root.value$$());
  constructor() {
    effect(() => {
      const anchor = this.anchor()?.nativeElement;
      if (!anchor) {
        return;
      }
      anchor.innerHTML = '';
      const data = this.field().form.root.value$$();
      if (!data) {
        return;
      }
      const formatter = new JSONFormatter(data);
      anchor.appendChild(formatter.render());
    });
  }
  submit() {
    alert(JSON.stringify(this.field().form.root.value));
  }
  resetForm() {
    this.field().form.root.reset(this.lastData);
  }
  lastData: any;
  saveInit() {
    this.lastData = this.field().form.root.value;
  }
}
