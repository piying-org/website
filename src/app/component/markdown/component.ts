import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  resource,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { MarkdownWebComponentService } from './markdown-web-component.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { locale } from '../../const/locate';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: '',
  templateUrl: './component.html',
})
export class MarkdownPage {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #http = inject(HttpClient);
  #domSanitizer = inject(DomSanitizer);
  #eleRef = inject<ElementRef<HTMLElement>>(ElementRef);
  #params = toSignal(this.#route.params);
  data = resource({
    params: () => this.#params(),
    loader: (input) => {
      const item = input.params;
      const url = `resolved/docs/${locale}/${[item['l1'], item['l2'], item['l3']].filter(Boolean).join('/')}.html`;
      return firstValueFrom(this.#http.get(url, { responseType: 'text' }))
        .then((item) => this.#domSanitizer.bypassSecurityTrustHtml(item))
        .catch((error) => {
          console.error(error);
          this.#router.navigate(['/']);
          return '';
        });
    },
  });

  constructor() {
    const mwc = inject(MarkdownWebComponentService);
    afterNextRender(() => {
      mwc.init();
      const fragment = this.#route.snapshot.fragment;
      if (fragment) {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            const el = this.#eleRef.nativeElement.querySelector(`#${fragment}`);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
              setTimeout(() => {
                el.scrollIntoView({ behavior: 'smooth' });
              }, 200);
              observer.disconnect();
            }
          });
        });

        observer.observe(this.#eleRef.nativeElement, {
          childList: true,
          subtree: true,
        });
      }
    });
  }
}
