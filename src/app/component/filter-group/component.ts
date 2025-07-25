import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PI_VIEW_FIELD_TOKEN, PiyingViewGroupBase } from '@piying/view-angular';

@Component({
  selector: 'filter-group',
  templateUrl: './component.html',
  imports: [NgTemplateOutlet, FormsModule],
})
export default class FilterFGC extends PiyingViewGroupBase {
  field = inject(PI_VIEW_FIELD_TOKEN);
  searchContent$ = signal('');
  searchFields$$ = computed(() => {
    const content = this.searchContent$().trim().toLocaleLowerCase();
    if (!content) {
      return [];
    }
    return this.fields().filter((item) =>
      item.props()['title']?.toLocaleLowerCase().includes(content),
    );
  });
}
