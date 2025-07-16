import { Routes } from '@angular/router';
import { SchemaViewRC } from './component/schema-view/component';
import * as v from 'valibot';
import {
  componentClass,
  NFCSchema,
  setComponent,
  setInputs,
  topClass,
} from '@piying/view-angular-core';
import { MarkdownPage } from './component/markdown/component';
import { PlaygroundGroupRoute, PlaygroundSingleRoute } from './page/playground';
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
                  label: '游乐场',
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
            }),
            componentClass('flex gap-4 w-full'),
          ),
        }),
        setComponent('main'),
      ),
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
