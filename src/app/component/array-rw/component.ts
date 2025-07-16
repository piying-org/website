import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  PI_VIEW_FIELD_TOKEN,
  PiViewGroupBase,
} from '@piying/view-angular';

@Component({
  selector: 'array-rw',
  templateUrl: './component.html',
  imports: [MatIcon, NgTemplateOutlet],
})
export default class ArrayRWComponent extends PiViewGroupBase {
  defaultLength = input<number>();
  initItem = input<(index: number | undefined) => any>();
  minLength = input<number>();
  field = inject(PI_VIEW_FIELD_TOKEN);

  ngOnInit(): void {
    const addLength = Math.max(
      0,
      (this.defaultLength() || 0) -
        (this.field().form.control!.value || []).length,
    );

    for (let i = 0; i < addLength; i++) {
      this.field().action.set(this.initItem()?.(i), i);
    }
  }
  remove(index: number) {
    this.field().action.remove(index);
  }
  add() {
    this.field().action.set(this.initItem()?.(undefined));
  }
}
