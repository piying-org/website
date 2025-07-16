import { inject } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import {
  setComponent,
  patchAsyncInputs,
  hideWhen,
  valueChange,
  componentClass,
  NFCSchema,
  asVirtualGroup,
} from '@piying/view-angular-core';
import { debounceTime, map } from 'rxjs';
import { SchemaViewRC } from '../component/schema-view/component';
import * as v from 'valibot';
const EvalViewDefine = v.pipe(
  NFCSchema,
  setComponent('evalView'),
  patchAsyncInputs({
    configCode: (field) =>
      field.get(['#', 'codeEditor'])!.form.control!.valueChanges.pipe(debounceTime(500)),
  }),
);
export const PlaygroundGroupRoute: Route = {
  path: 'playground/group/:type',
  component: SchemaViewRC,
  data: {
    context: () => {
      const route = inject(ActivatedRoute);
      const groupType = route.snapshot.params['type'];
      return {
        getList: async () => {
          if (!groupType) {
            return [];
          }
          return fetch(`examples/${groupType}.json`).then((a) => a.json());
        },
      };
    },
    schema: v.pipe(
      v.intersect([
        v.pipe(
          v.object({
            list: v.pipe(
              v.string(),
              setComponent('picklist'),
              patchAsyncInputs({
                options: (field) => field.context.getList(),
              }),
              hideWhen({
                listen: (fn) =>
                  fn({ list: [undefined] }).pipe(map(({ list }) => list[0])),
              }),
              valueChange((fn) => {
                fn({ list: [undefined] }).subscribe(({ list, field }) => {
                  if (!list[0]) {
                    return;
                  }
                  field
                    .get(['..', 'codeEditor'])!
                    .form.control!.updateValue(list[0]);
                });
              }),
            ),
            codeEditor: v.pipe(v.string(), setComponent('codeEditor')),
          }),
          componentClass('flex flex-col gap-4'),
        ),
        v.pipe(
          v.object({
            __evalView: EvalViewDefine,
          }),
        ),
      ]),
      asVirtualGroup(),
      componentClass('flex gap-4 *:flex-1 h-full mt-4'),
    ),
  },
};
export const PlaygroundSingleRoute: Route = {
  path: 'playground/single',
  component: SchemaViewRC,
  data: {
    schema: v.pipe(
      v.intersect([
        v.pipe(
          v.object({
            codeEditor: v.pipe(v.string(), setComponent('codeEditor')),
          }),
          componentClass('flex flex-col gap-4'),
        ),
        v.pipe(
          v.object({
            __evalView: EvalViewDefine,
          }),
        ),
      ]),
      asVirtualGroup(),
      componentClass('flex gap-4 *:flex-1 h-full mt-4'),
    ),
    model: async () => {
      const route = inject(ActivatedRoute);
      const inputData = route.snapshot.queryParams['input'];
      return {
        codeEditor: `(() => {
    let schema = ${JSON.parse(inputData)}
    return { schema: schema }
})()`,
      };
    },
  },
};
