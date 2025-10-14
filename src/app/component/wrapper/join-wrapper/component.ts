import { Component, inject, input, viewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { PiyingViewWrapperBase } from '@piying/view-angular';
export interface JoinItem {
  icon?: string;
  text?: string;
}
@Component({
  selector: 'app-join-item-wrapper',
  templateUrl: './component.html',
  imports: [MatIcon],
})
export class JoinItemWC extends PiyingViewWrapperBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  prefix = input<JoinItem>();
  suffix = input<JoinItem>();
}
