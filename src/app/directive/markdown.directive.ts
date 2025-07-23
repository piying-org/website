import { Directive, ElementRef, inject, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Renderer, Tokens, Marked, lexer } from 'marked';
import { markedHighlight } from 'marked-highlight';
import { hljsCode } from './hilight-code.directive';
import { encode } from 'html-entities';
import { $localize } from '@cyia/localize';
function _tagged_template_literal(strings: string[], raw?: any) {
  if (!raw) {
    raw = strings.slice(0);
  }
  return Object.freeze(
    Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw),
      },
    }),
  ) as TemplateStringsArray;
}
function getId(headingText: string) {
  // debugger
  const id = headingText
    .toLowerCase()
    // .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
  return id;
}
class Renderer2 extends Renderer {
  route;
  constructor(route: ActivatedRoute) {
    super();
    this.route = route;
  }
  override blockquote({ tokens }: Tokens.Blockquote): string {
    const body = this.parser.parse(tokens);
    return `<blockquote class="alert alert-info alert-soft">\n${body}</blockquote>\n`;
  }
  override codespan({ text }: Tokens.Codespan): string {
    return `<code class="badge badge-outline badge-info mx-2">${encode(text)}</code>`;
  }
  override heading({ tokens, depth, text }: Tokens.Heading): string {
    if (depth === 2 || depth === 3) {
      let titleName = text;
      let [token] = lexer(text);
      if (token.type === 'paragraph') {
        if (token.tokens?.length === 1 && token.tokens[0].type === 'link') {
          titleName = token.tokens[0].text;
        }
      }
      const id = getId(titleName);

      const url = this.route.snapshot.url
        .map((item) => item.toString())
        .join('/');
      const anchor = `<a href="${url}#${id}" class="no-underline">
              <span class="heading-anchorlink-icon bg-base-content/5 hover:bg-primary/10 size-[1em] text-base-content/30 hover:text-primary/50 rounded-field border border-base-content/5 hover:border-primary/20 inline-grid place-content-center hover:shadow-sm hover:shadow-base-200 align-text-bottom me-3 lg:absolute lg:ms-[-1.5em] lg:mt-1 transition-all group">
                <svg class="group-hover:scale-100 scale-90 transition-transform" fill="currentColor" width=".5em" height=".5em" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
                  <path d="M216,148H172V108h44a12,12,0,0,0,0-24H172V40a12,12,0,0,0-24,0V84H108V40a12,12,0,0,0-24,0V84H40a12,12,0,0,0,0,24H84v40H40a12,12,0,0,0,0,24H84v44a12,12,0,0,0,24,0V172h40v44a12,12,0,0,0,24,0V172h44a12,12,0,0,0,0-24Zm-108,0V108h40v40Z"/>
                </svg>
              </span>
            </a>`;
      return `<h${depth} id="${id}">${anchor}<span>${this.parser.parseInline(
        tokens,
      )}</span></h${depth}>\n`;
    }
    return `<h${depth}>${this.parser.parseInline(tokens)}</h${depth}>\n`;
  }
  override code({ text, lang, escaped }: Tokens.Code): string {
    return lang === 'ts'
      ? text
      : '<pre><code class="language-' + lang + '">' + text + '</code></pre>\n';
  }
}

let codeIndex = 0;
const PrevLabel = $localize`预览`;
const CodeLabel = $localize`代码`;
export const CodeMap = new Map<number, string>();
const marked = new Marked(
  markedHighlight({
    langPrefix: 'ts',
    highlight: (code, lang, info) => {
      // ts为可以eval的typescript为不能eval的
      const codeData = hljsCode(code);
      const currentIndex = codeIndex++;
      CodeMap.set(currentIndex, code);
      const tabName = `code-tab-${currentIndex}`;
      // todo md代码包裹
      if (lang === 'ts') {
        return `<div class="tabs tabs-lift">
        <input type="radio" name="${tabName}" class="tab" aria-label="${PrevLabel}" checked="checked"/>
        <div class="tab-content bg-base-100 border-base-300 p-6 code-tab-background">
        <app-eval-view data-code-index="${currentIndex}"></app-eval-view>
        </div>
        <input type="radio" name="${tabName}" class="tab" aria-label="${CodeLabel}"/>
      <pre class="tab-content bg-base-100 border-base-300 p-6"><code class="language-${lang}"><div>${codeData}</div></code></pre>  
        <app-open-playground data-code-index="${currentIndex}"></app-open-playground>

        </div>`;
      }
      return codeData;
    },
  }),
);
const textList = new Set<string>();
(window as any).__getTranslate = () => {
  const text = JSON.stringify([...textList].sort(), undefined, 4);
  const link = document.createElement('a');
  link.download = 'doc.json';
  link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
marked.use({
  hooks: {
    processAllTokens(tokens) {
      if (localStorage.getItem('lang') === 'zh-hans') {
        return tokens;
      }

      for (let index = 0; index < tokens.length; index++) {
        const token = tokens[index];
        if (
          token.type === 'heading' ||
          token.type === 'paragraph' ||
          token.type === 'blockquote'
        ) {
          textList.add(token.text);
          const text = $localize(_tagged_template_literal([token.text]));
          if (token.type === 'heading') {
            const transList = lexer(`${'#'.repeat(token.depth)} ${text}`);
            tokens[index] = transList[0];
          } else if (token.type === 'blockquote') {
            const transList = lexer(`> ${text}`);
            tokens[index] = transList[0];
          } else {
            const transList = lexer(text);
            tokens[index] = transList[0];
          }
        } else if (token.type === 'list') {
          for (let j = 0; j < (token as Tokens.List).items.length; j++) {
            const item = (token as Tokens.List).items[j];
            textList.add(item.text);
            const text = $localize(_tagged_template_literal([item.text]));
            const transList = lexer(`- ${text}`);
            (token as Tokens.List).items[j] = (transList[0] as any)
              .items[0] as any;
          }
        }
      }

      return tokens;
    },
  },
});
@Directive({
  selector: '[markdown]',
})
export class MarkdownDirective {
  route = inject(ActivatedRoute);
  markdown = input.required<string>();
  #eleRef = inject<ElementRef<HTMLElement>>(ElementRef);
  ngOnChanges(): void {
    this.#eleRef.nativeElement.innerHTML = marked.parse(this.markdown(), {
      gfm: true,
      async: false,
      renderer: new Renderer2(this.route),
    });
  }
}
