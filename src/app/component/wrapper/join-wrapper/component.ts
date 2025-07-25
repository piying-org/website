import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { PiWrapperBaseComponent } from '@piying/view-angular';
export interface JoinItem {
  icon?: string;
  text?: string;
}
@Component({
  selector: 'app-join-item-wrapper',
  templateUrl: './component.html',
  imports: [MatIcon],
})
export class JoinItemWC extends PiWrapperBaseComponent {
  prefix = input<JoinItem>();
  suffix = input<JoinItem>();
}
