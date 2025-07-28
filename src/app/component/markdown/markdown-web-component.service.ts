import {
  Injectable,
  Injector,
  inject,
  reflectComponentType,
} from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { EvalViewWC } from '../../page/eval-view/component';
import { OpenPlayGroundWC } from '../../page/open-playground/component';
import { TabsWC } from './tabs/component';
@Injectable({ providedIn: 'root' })
export class MarkdownWebComponentService {
  #injector = inject(Injector);
  #inited = false;
  init() {
    if (this.#inited) {
      return;
    }

    for (const Item of [EvalViewWC, OpenPlayGroundWC, TabsWC]) {
      const element = createCustomElement(Item, {
        injector: this.#injector,
      });
      customElements.define(
        reflectComponentType(Item as any)!.selector,
        element,
      );
    }
    this.#inited = true;
  }
}
