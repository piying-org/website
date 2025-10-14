import { Component, viewChild } from '@angular/core';
import { PiyingViewWrapperBase } from '@piying/view-angular';

@Component({
  selector: 'label-wrapper',
  templateUrl: './component.html',
})
export class LabelWC extends PiyingViewWrapperBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
}
