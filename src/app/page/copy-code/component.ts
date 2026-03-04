import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Clipboard } from '@angular/cdk/clipboard';
@Component({
  selector: 'app-copy',
  templateUrl: './component.html',
  imports: [MatIcon],
})
export class OpenCopyWC {
  #el = inject<ElementRef<HTMLElement>>(ElementRef);
  #board = inject(Clipboard);
  @HostListener('click')
  clicked() {
    const str = this.#el.nativeElement.dataset['value']!;
    this.#board.copy(str);
  }
}
