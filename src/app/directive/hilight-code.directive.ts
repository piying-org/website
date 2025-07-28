import { Directive, ElementRef, inject, input } from '@angular/core';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import shell from 'highlight.js/lib/languages/shell';
import html from 'highlight.js/lib/languages/xml';
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('html', html);
export function hljsCode(str: string, language?: string) {
  return hljs.highlight(str, {
    language: language ?? 'typescript',
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
