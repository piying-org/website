import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  SimpleChanges,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { PI_VIEW_FIELD_TOKEN, PiViewGroupBase } from '@piying/view-angular';

@Component({
  selector: 'array-rw',
  templateUrl: './component.html',
  imports: [MatIcon, NgTemplateOutlet],
})
export default class ArrayRWComponent extends PiViewGroupBase {
  initItem = input<(index: number | undefined) => any>();
  minLength = input<number>();
  fixedLength = input<number>();
  field = inject(PI_VIEW_FIELD_TOKEN);
  isFixedLength$$ = computed(() => {
    return typeof this.fixedLength() === 'number';
  });
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['minLength']) {
      let minLength = this.minLength() ?? 0;
      for (
        let i = (this.field().fieldArray!() || []).length;
        i < minLength;
        i++
      ) {
        this.field().action.set(this.initItem()?.(i), i);
      }
    }
    if (changes['fixedLength']) {
      let fixedLength = this.fixedLength() ?? 0;
      let currentLength = (this.field().fieldArray!() || []).length;

      if (currentLength < fixedLength) {
        for (let i = currentLength; i < fixedLength; i++) {
          this.field().action.set(this.initItem()?.(i), i);
        }
      } else if (currentLength > fixedLength) {
        for (let i = fixedLength; i < currentLength; i++) {
          this.field().action.remove(fixedLength);
        }
      }
    }
  }
  remove(index: number) {
    this.field().action.remove(index);
  }
  add() {
    this.field().action.set(this.initItem()?.(undefined));
  }
}
