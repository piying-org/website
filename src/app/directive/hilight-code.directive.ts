import { Directive, ElementRef, inject, input } from '@angular/core';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
hljs.registerLanguage('typescript', typescript);
export function hljsCode(str: string) {
  return hljs.highlight(str, {
    language: 'typescript',
  }).value;
}
@Directive({
  selector: '[hilightCode]',
})
export class HilightCodeDirective {
  hilightCode = input.required<string>();
  #el = inject<ElementRef<HTMLElement>>(ElementRef);

  ngOnChanges(): void {
    this.#el.nativeElement.innerHTML = hljs.highlight(this.hilightCode(), {
      language: 'typescript',
    }).value;
  }
}
