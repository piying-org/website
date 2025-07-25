import { Component, input } from '@angular/core';
import { PiWrapperBaseComponent } from '@piying/view-angular';
export interface JoinItem{
  icon?:string
  text?:string
}
@Component({
  selector: 'app-panel-wrapper',
  templateUrl: './component.html',
})
export class PanelWC extends PiWrapperBaseComponent {
  
}
