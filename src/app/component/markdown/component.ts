import { Component, inject } from '@angular/core';
import { MarkdownDirective } from '../../directive/markdown.directive';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { switchMap, map } from 'rxjs';
import { MarkdownWebComponentService } from './markdown-web-component.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: '',
  templateUrl: './component.html',
  imports: [MarkdownDirective, AsyncPipe],
})
export class MarkdownPage {
  #route = inject(ActivatedRoute);
  #http = inject(HttpClient);
  data = this.#route.params.pipe(
    map(
      (item) => `docs/${[item['l1'], item['l2']].filter(Boolean).join('/')}.md`,
    ),
    switchMap((url) => this.#http.get(url, { responseType: 'text' })),
  );

  constructor() {
    inject(MarkdownWebComponentService).init();
  }
}
