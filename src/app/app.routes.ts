import { Routes } from '@angular/router';
import { SchemaViewRC } from './component/schema-view/component';
import * as v from 'valibot';
import {
  componentClass,
  NFCSchema,
  patchAsyncInputs,
  setComponent,
  setInputs,
  topClass,
  valueChange,
} from '@piying/view-angular-core';
import { MarkdownPage } from './component/markdown/component';
import { PlaygroundGroupRoute, PlaygroundSingleRoute } from './page/playground';
import { skip } from 'rxjs';
import { $localize } from '@cyia/localize';
export const routes: Routes = [
  {
    path: '',
    component: SchemaViewRC,
    data: {
      schema: v.pipe(
        v.object({
          toolbar: v.pipe(
            v.object({
              __block: v.pipe(
                NFCSchema,
                setComponent('block'),
                topClass('flex-1'),
              ),
              __playground: v.pipe(
                NFCSchema,
                setComponent('button-link'),
                setInputs({
                  href: '/playground/group/form',
                  label: $localize`游乐场`,
                }),
              ),
              __github: v.pipe(
                NFCSchema,
                setComponent('button-link'),
                setInputs({
                  externalLink: 'https://github.com/piying-org/website',
                  type: 'img',
                  imgLink: './img/github.svg',
                }),
              ),
              language: v.pipe(
                v.string(),
                setComponent('picklist'),
                setInputs({
                  options: [
                    { label: '中文', value: 'zh-hans' },
                    { label: 'english', value: 'en' },
                  ],
                }),
                topClass('w-[80px]'),
                valueChange((fn) => {
                  fn()
                    .pipe(skip(1))
                    .subscribe(({ list }) => {
                      let last = localStorage.getItem('lang');
                      if (last !== list[0]) {
                        localStorage.setItem('lang', list[0]);
                        location.reload();
                      }
                    });
                }),
              ),
            }),
            componentClass('flex gap-4 w-full'),
          ),
        }),
        setComponent('main'),
      ),
      model: async () => {
        return {
          toolbar: { language: localStorage.getItem('lang') ?? 'zh-hans' },
        };
      },
    },
    children: [
      {
        path: 'docs/:l1',
        component: MarkdownPage,
      },
      {
        path: 'docs/:l1/:l2',
        component: MarkdownPage,
      },
      PlaygroundGroupRoute,
      PlaygroundSingleRoute,
      {
        path: '',
        component: SchemaViewRC,
        data: {
          schema: v.object({
            __main: v.pipe(NFCSchema, setComponent('main-1')),
          }),
        },
      },
    ],
  },
];
