import { Component, viewChild } from '@angular/core';
import { PiyingViewWrapperBase } from '@piying/view-angular';
export interface JoinItem {
  icon?: string;
  text?: string;
}
@Component({
  selector: 'app-block',
  templateUrl: './component.html',
})
export class BlockWC extends PiyingViewWrapperBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
}
