import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { PI_VIEW_FIELD_TOKEN, PiyingViewGroupBase } from '@piying/view-angular';
import { FieldLogicGroup } from '@piying/view-angular-core';
import { SelectComponent } from '../select/component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-logic-group',
  templateUrl: './component.html',
  imports: [NgTemplateOutlet, SelectComponent, FormsModule],
})
export default class LogicFGC extends PiyingViewGroupBase {
  field = inject(PI_VIEW_FIELD_TOKEN);
  list = computed(() => {
    return this.fields().map((item, index) => ({
      label: item.props()['title'],
      value: index,
    }));
  });

  selectAny$ = signal<number[]>([]);
  selectOr$ = signal<number>(0);

  anyOfChange() {
    let flg = this.field().form.control as FieldLogicGroup;
    let list = flg.controls.filter((item, i) => this.selectAny$().includes(i));
    flg.activateControl$.set(list);
  }
  oneOfChange() {
    if (typeof this.selectOr$() !== 'number') {
      return;
    }
    let flg = this.field().form.control as FieldLogicGroup;
    flg.activateIndex$.set(this.selectOr$()!);
  }
}
