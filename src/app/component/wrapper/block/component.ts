import { Component, viewChild } from '@angular/core';
import { InsertFieldDirective } from '@piying/view-angular';
export interface JoinItem {
  icon?: string;
  text?: string;
}
@Component({
  selector: 'app-block',
  templateUrl: './component.html',
  imports: [InsertFieldDirective],
})
export class BlockWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
}
