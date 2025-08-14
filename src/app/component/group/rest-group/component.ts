import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { PiyingViewGroupBase } from '@piying/view-angular';
import { isFieldGroup } from '@piying/view-angular-core';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'rest-group',
  templateUrl: './component.html',
  imports: [NgTemplateOutlet, MatIcon, FormsModule],
})
export default class RestGroup extends PiyingViewGroupBase {
  addKey$ = signal('');
  wrapperClass = input<any>();

  add() {
    if (this.isGroup$$()) {
      this.field$$().action.set(undefined, this.addKey$());
      this.addKey$.set('');
    } else {
      this.field$$().action.set(undefined);
    }
  }
  remove(index: number) {
    if (this.isGroup$$()) {
      let item = this.field$$().restChildren!()[index];
      this.field$$().action.remove(item.keyPath!.slice(-1)[0]);
    } else {
      this.field$$().action.remove(index);
    }
  }
  isGroup$$ = computed(() => {
    return isFieldGroup(this.field$$().form.control);
  });
}
