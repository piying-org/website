import { NgClass } from '@angular/common';
import { Component, HostListener, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './component.html',
  imports: [NgClass],
})
export default class ButtonNFCC {
  label = input<string>();
  classStyle = input<string>();
  clicked = output();
  @HostListener('click', ['$event'])
  clickEvent(event: any) {
    this.clicked.emit(event);
  }
}
