import { Component, ElementRef, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { switchMap, map, catchError, of } from 'rxjs';
import { MarkdownWebComponentService } from './markdown-web-component.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { locale } from '../../const/locate';

@Component({
  selector: '',
  templateUrl: './component.html',
  imports: [AsyncPipe],
})
export class MarkdownPage {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #http = inject(HttpClient);
  #domSanitizer = inject(DomSanitizer);
  #eleRef = inject<ElementRef<HTMLElement>>(ElementRef);

  data = this.#route.params.pipe(
    map(
      (item) =>
        `resolved/docs/${locale}/${[item['l1'], item['l2'], item['l3']].filter(Boolean).join('/')}.html`,
    ),
    switchMap((url) => this.#http.get(url, { responseType: 'text' })),
    map((item) => {
      return this.#domSanitizer.bypassSecurityTrustHtml(item);
    }),
    catchError(() => {
      this.#router.navigate(['/']);
      return of('');
    }),
  );

  constructor() {
    inject(MarkdownWebComponentService).init();
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
  }
}
