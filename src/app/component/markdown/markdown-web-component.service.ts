import {
  Injectable,
  Injector,
  inject,
  reflectComponentType,
} from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { EvalViewWC } from '../../page/eval-view/component';
import { OpenPlayGroundWC } from '../../page/open-playground/component';
@Injectable({ providedIn: 'root' })
export class MarkdownWebComponentService {
  #injector = inject(Injector);
  #inited = false;
  init() {
    if (this.#inited) {
      return;
    }
    const element = createCustomElement(EvalViewWC, {
      injector: this.#injector,
    });
    customElements.define(reflectComponentType(EvalViewWC)!.selector, element);
    this.#inited = true;
    const element2 = createCustomElement(OpenPlayGroundWC, {
      injector: this.#injector,
    });
    customElements.define(
      reflectComponentType(OpenPlayGroundWC)!.selector,
      element2,
    );
    this.#inited = true;
  }
}
