import { Component, computed, inject, viewChild } from '@angular/core';
import { InsertFieldDirective, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';

@Component({
  selector: 'label-wrapper',
  templateUrl: './component.html',
  imports: [InsertFieldDirective],
})
export class LabelWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');

  field$$ = inject(PI_VIEW_FIELD_TOKEN);
  props$$ = computed(() => this.field$$().props());
}
