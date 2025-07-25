import * as v from 'valibot';
import {
  asVirtualGroup,
  setComponent,
  valueChange,
} from '@piying/view-angular-core';
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
