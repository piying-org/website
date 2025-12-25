import { inject } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import {
  setComponent,
  valueChange,
  NFCSchema,
  asVirtualGroup,
  actions,
} from '@piying/view-angular-core';
import { debounceTime } from 'rxjs';
import { SchemaViewRC } from '../component/schema-view/component';
import * as v from 'valibot';
import { HttpClient } from '@angular/common/http';
const EvalViewDefine = v.pipe(
  NFCSchema,
  setComponent('evalView'),
  actions.inputs.patchAsync({
    configCode: (field) =>
      field
        .get(['#', 'codeEditor'])!
        .form.control!.valueChanges.pipe(debounceTime(500)),
  }),
);
export const PlaygroundGroupRoute: Route = {
  path: 'playground/group/:type',
  component: SchemaViewRC,
  data: {
    context: () => {
      const route = inject(ActivatedRoute);
      const http = inject(HttpClient);
      const groupType = route.snapshot.params['type'];
      return {
        getList: () => {
          if (!groupType) {
            return [];
          }
          return http.get(`examples/${groupType}.json`, {});
        },
      };
    },
    schema: () =>
      v.pipe(
        v.intersect([
          v.pipe(
            v.object({
              list: v.pipe(
                v.string(),
                setComponent('picklist'),
                actions.inputs.patch({ options: [] }),
                actions.inputs.patchAsync({
                  options: (field) => field.context.getList(),
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
            actions.class.top('flex flex-col gap-4'),
            actions.wrappers.set(['block']),
          ),
          v.pipe(
            v.object({
              __evalView: EvalViewDefine,
            }),
          ),
        ]),
        asVirtualGroup(),
        actions.wrappers.set(['block']),
        actions.class.top('flex gap-4 *:flex-1 pt-4 h-[calc(100vh-4rem-4rem)]'),
      ),
  },
};
export const PlaygroundSingleRoute: Route = {
  path: 'playground/single',
  component: SchemaViewRC,
  data: {
    schema: () =>
      v.pipe(
        v.intersect([
          v.pipe(
            v.object({
              codeEditor: v.pipe(v.string(), setComponent('codeEditor')),
            }),
            actions.class.component('flex flex-col gap-4'),
          ),
          v.pipe(
            v.object({
              __evalView: EvalViewDefine,
            }),
          ),
        ]),
        asVirtualGroup(),
        actions.class.top('flex gap-4 *:flex-1 h-full mt-4'),
        actions.wrappers.set(['block']),
      ),
    model: async () => {
      const route = inject(ActivatedRoute);
      const inputData = route.snapshot.queryParams['input'] as string;
      const data = JSON.parse(inputData) as string;
      if (data.startsWith('{')) {
        return {
          codeEditor: `(() => {
return ${data}
})()`,
        };
      }
      return {
        codeEditor: `(() => {
    let schema = ${data}
    return { schema: schema }
})()`,
      };
    },
  },
};
