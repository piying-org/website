import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { PI_VIEW_FIELD_TOKEN, PiyingViewGroupBase } from '@piying/view-angular';

@Component({
  selector: 'steps-group',
  templateUrl: './component.html',
  imports: [NgTemplateOutlet],
})
export default class StepsFGC extends PiyingViewGroupBase {
  field = inject(PI_VIEW_FIELD_TOKEN);

  activatedIndex$ = signal(0);
  activatedItem$$ = computed(() => this.fields()[this.activatedIndex$()]);

  toPrev() {
    this.activatedIndex$.update((value) => value - 1);
  }
  toNext() {
    this.activatedIndex$.update((value) => value + 1);
  }
}
