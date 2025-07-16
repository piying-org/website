import { setComponent } from '@piying/view-angular-core';
import * as v from 'valibot';

export const SchemaDefine = v.pipe(
  v.object({
    support: v.pipe(
      v.optional(v.picklist(['angular', 'vue']), 'angular'),
      v.title('当前支持'),
    ),
    rating: v.pipe(
      v.optional(v.number()),
      setComponent('rating'),
      v.title('评价'),
    ),
    bool1: v.pipe(v.boolean(), v.title('使用皮影')),
  }),
  setComponent('fieldset'),
);
