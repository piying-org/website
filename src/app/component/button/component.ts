import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './component.html',
  imports: [NgClass],
})
export default class ButtonNFCC {
  label = input<string>();
  classStyle = input<string>();
}
