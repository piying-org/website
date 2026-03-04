import { Component, ElementRef, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-open-playground',
  templateUrl: './component.html',
  imports: [MatIcon, RouterLink],
})
export class OpenPlayGroundWC {
  #el = inject<ElementRef<HTMLElement>>(ElementRef);
  #router = inject(Router);
  linkStr = (() => {
    const str = this.#el.nativeElement.dataset['code']!;
    const urlTree = this.#router.createUrlTree(['/playground/single'], {
      queryParams: { input: JSON.stringify(str) },
    });
    return urlTree;
  })();
}
