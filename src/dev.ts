import * as v from 'valibot';
import {
  asVirtualGroup,
  formConfig,
  layout,
  mergeOutputs,
  NFCSchema,
  nonFieldControl,
  patchInputs,
  setAlias,
  setComponent,
  setWrappers,
  valueChange,
} from '@piying/view-angular-core';
import { BehaviorSubject, debounceTime, pipe } from 'rxjs';
const a = v.pipe(
  v.object({
    k1: v.pipe(v.string(), v.title('一级k1')),
    o1: v.pipe(
      v.object({
        k2: v.pipe(v.optional(v.string()), v.title('二级k2')),
        k3: v.pipe(v.optional(v.string()), v.title('二级k3')),
      }),
      setComponent('fieldset'),
      v.title('一级o1'),
    ),
  }),
  setComponent('fieldset'),
  valueChange((fn) => {
    fn().subscribe(({ list }) => {
      console.log(list[0]);
    });
  }),
);

const b = v.pipe(
  v.intersect([
    v.pipe(
      v.object({
        k1: v.optional(v.string()),
        k2: v.optional(v.string()),
      }),
      setComponent('fieldset'),
      v.title('tab1-fieldset'),
    ),
    v.pipe(
      v.object({
        k3: v.optional(v.string()),
        k4: v.optional(v.string()),
      }),
      v.title('tab2'),
    ),
  ]),
  setComponent('tabs'),
  asVirtualGroup(),
  valueChange((fn) => {
    fn().subscribe(({ list }) => {
      console.log('tabs', list[0]);
    });
  }),
);

(() => {
  v.pipe(
    v.object({
      k1: v.pipe(v.string(), v.title('一级k1'), setWrappers(['label'])),
      o1: v.pipe(
        v.object({
          k2: v.pipe(
            v.optional(v.string()),
            v.title('二级k2'),
            setWrappers(['label']),
          ),
          k3: v.pipe(
            v.optional(v.string()),
            v.title('二级k3'),
            setWrappers(['label']),
          ),
        }),
        setComponent('fieldset'),
        v.title('一级o1'),
      ),
    }),
    setComponent('fieldset'),
    valueChange((fn) => {
      fn().subscribe(({ list }) => {
        console.log(list[0]);
      });
    }),
  );
})();

(() => {
  const d = v.pipe(
    v.object({
      k1: v.pipe(v.string(), v.title('k1-label'), setWrappers(['label'])),
      k2: v.pipe(
        v.number(),
        v.title('k2-label'),
        v.minValue(10),
        setWrappers(['label', 'validator']),
      ),
    }),
    setComponent('fieldset'),
  );
})();

(() => ({
  schema: v.pipe(
    v.object({
      text: v.pipe(
        v.string(),
        formConfig({ pipe: { toModel: pipe(debounceTime(2000)) } }),
      ),
      updateOnBlur: v.pipe(
        v.string(),
        formConfig({ updateOn: 'blur' }),
        v.title('`updateOn` on Blur'),
      ),
      updateOnSubmit: v.pipe(
        v.string(),
        formConfig({ updateOn: 'submit' }),
        v.title('`updateOn` on Submit'),
      ),
      __helper: v.pipe(
        NFCSchema,
        setComponent('formHelper'),
        patchInputs({ forceEnableSubmit: true }),
      ),
    }),
    setComponent('formly-group'),
  ),
}))();
(() => {
  const a = v.pipe(
    v.intersect([
      v.pipe(v.object({}), setComponent('fieldset'), setAlias('ly1')),
      v.pipe(v.object({}), setComponent('fieldset'), setAlias('ly2')),
      v.object({
        input1: v.pipe(
          v.string(),
          layout({ keyPath: ['@ly1'] }),
          v.title('input1'),
        ),
        input2: v.pipe(
          v.string(),
          layout({ keyPath: ['@ly2'], priority: 3 }),
          v.title('input2'),
        ),
        input3: v.pipe(
          v.string(),
          layout({ keyPath: ['@ly2'], priority: 2 }),
          v.title('input3'),
        ),
        input4: v.pipe(
          v.string(),
          layout({ keyPath: ['@ly2'], priority: 1 }),
          v.title('input4'),
        ),
        __helper: v.pipe(NFCSchema, setComponent('formHelper')),
      }),
    ]),
    asVirtualGroup(),
  );
})();
(() => {
  // let obj = v.string();
  // let obj2 = v.number();
  // let obj2 = v.boolean();
  // let obj2 = v.picklist(['v1', 'v2', 'v3']);
  const obj2 = {
    schema: v.object({
      k1: v.string(),
      k2: v.number(),
    }),
  };
})();

(() => ({
  model: { k1: 'v1', k2: 2, k3: 'v3' },
  schema: v.object({
    k1: v.string(),
    k2: v.number(),
    __helper: v.pipe(NFCSchema, setComponent('formHelper')),
  }),
}))();
(() => ({
  model: { k1: 'v1', k2: 2, k3: 'v3' },
  schema: v.strictObject({
    k1: v.string(),
    k2: v.number(),
    __helper: v.pipe(NFCSchema, setComponent('formHelper')),
  }),
}))();
(() => ({
  model: { k1: 'v1', k2: 2, k3: 'v3' },
  schema: v.looseObject({
    k1: v.string(),
    k2: v.number(),
    __helper: v.pipe(NFCSchema, setComponent('formHelper')),
  }),
}))();
(() => ({
  model: { k1: 'v1', k2: 2, k3: 'v3' },
  schema: v.intersect([
    v.objectWithRest(
      {
        k1: v.string(),
        k2: v.number(),
      },
      v.string(),
    ),
    v.optional(
      v.object({
        __helper: v.pipe(NFCSchema, setComponent('formHelper')),
      }),
    ),
  ]),
}))();
(() => ({
  model: { list: ['v1'] },
  schema: v.intersect([
    v.object({
      list: v.array(v.string()),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ]),
}))();
(() => ({
  model: { list: ['v1'] },
  schema: v.intersect([
    v.object({
      list: v.tuple([v.string()]),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ]),
}))();
(() => ({
  model: { list: ['v1'] },
  schema: v.intersect([
    v.object({
      list: v.tuple([v.string()]),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ]),
}))();
(() => ({
  model: { list: ['v1', 'v2'] },
  schema: v.intersect([
    v.object({
      list: v.strictTuple([v.string()]),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ]),
}))();
(() => ({
  model: { list: ['v1', 'v2'] },
  schema: v.intersect([
    v.object({
      list: v.looseTuple([v.string()]),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ]),
}))();
(() => ({
  model: { list: ['v1', 'v2'] },
  schema: v.intersect([
    v.object({
      list: v.tupleWithRest([v.string()], v.string()),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ]),
}))();
(() => ({
  model: { o1: { k1: 'v1' } },
  schema: v.intersect([
    v.object({
      o1: v.record(v.string(), v.string()),
    }),
    v.optional(
      v.object({
        __helper: v.pipe(NFCSchema, setComponent('formHelper')),
      }),
    ),
  ]),
}))();

(() => ({
  schema: v.pipe(
    v.object({
      toggle: v.pipe(
        v.optional(
          v.tuple(
            [
              'simple',
              'nested',
              'arrays',
              'numbers',
              'references',
              'schema_dependencies',
              'null_field',
              'nullable',
              'allOf',
              'anyOf',
              'oneOf',
              'select_alternatives',
            ].map((item) =>
              v.pipe(
                NFCSchema,
                setComponent('button'),
                patchInputs({ label: item }),
                mergeOutputs({
                  click: (_, field) => {
                    // todo
                    fetch(`ngx-formly/json-schema/${item}_json`)
                      .then((item) => item.json())
                      .then((result) => {
                        field.get(['#', 'jsonSchema']).updateValue(result);
                      });
                  },
                }),
              ),
            ),
          ),
        ),
        setComponent('object'),
        nonFieldControl(),
      ),
      jsonSchema: v.pipe(
        v.any(),
        setComponent('jsonSchema'),
        patchInputs({ data: undefined }),
      ),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
    setComponent('formly-group'),
  ),
}))();

(() => ({
  context: { lastValue$: new BehaviorSubject(undefined) },
  schema: v.object({
    input1: v.pipe(
      v.string(),
      valueChange((fn) => {
        fn({ list: [undefined] }).subscribe(({ list, field }) => {
          console.log('prev:', field.context.lastValue$.value);

          field.context.lastValue$.next(list[0]);
        });
      }),
    ),
  }),
}))();
