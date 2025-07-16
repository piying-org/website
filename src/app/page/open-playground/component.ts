import { Component, ElementRef, inject } from '@angular/core';
import { CodeMap } from '../../directive/markdown.directive';
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
    const index = +this.#el.nativeElement.dataset['codeIndex']!;
    const str = CodeMap.get(index)!;
    const urlTree = this.#router.createUrlTree(['/playground/single'], {
      queryParams: { input: JSON.stringify(str) },
    });
    return urlTree;
  })();
}
