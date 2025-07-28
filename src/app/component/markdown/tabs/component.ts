import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import { MarkdownDirective } from '../../../directive/markdown.directive';
import { decode } from 'html-entities';
@Component({
  selector: 'custom-tabs',
  templateUrl: './component.html',
  imports: [MarkdownDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsWC {
  container = viewChild<ElementRef<HTMLElement>>('container');
  static index = 0;
  name = `custom-tabs-${TabsWC.index++}`;
  list$ = signal<{ label: string; content: string }[]>([]);

  constructor() {
    effect((cleanFn) => {
      let containerEl = this.container()?.nativeElement;
      if (!containerEl) {
        return;
      }
      if (containerEl.children.length) {
        this.slotChanged([...(containerEl.children as any)]);
      } else {
        const observer = new MutationObserver((mutations) => {
          const list = containerEl.querySelectorAll(`custom-tab`);
          this.slotChanged([...(list.values() as any)]);
          observer.disconnect();
        });
        observer.observe(containerEl, {
          childList: true,
          subtree: true,
        });
        cleanFn(() => {
          observer.disconnect();
        });
      }
    });
  }
  slotChanged(list: HTMLElement[]) {
    this.list$.set(
      list.map((item) => {
        return {
          label: item.dataset['label']?.trim() ?? '',
          content: item.textContent?.trim() ?? '',
        };
      }),
    );
  }
}
