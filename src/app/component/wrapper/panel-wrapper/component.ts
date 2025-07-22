import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { PiWrapperBaseComponent } from '@piying/view-angular';
export interface JoinItem{
  icon?:string
  text?:string
}
@Component({
  selector: 'app-panel-wrapper',
  templateUrl: './component.html',
  imports: [MatIcon],
})
export class PanelWC extends PiWrapperBaseComponent {
  
}
