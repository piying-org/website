import { Route } from '@angular/router';
import {
  setComponent,
  patchAsyncInputs,
  componentClass,
  asVirtualGroup,
} from '@piying/view-angular-core';
import { filter, map } from 'rxjs';
import { SchemaViewRC } from '../component/schema-view/component';
import * as v from 'valibot';

export const JsonPlaygroundRoute: Route = {
  path: 'jsonschema-playground',
  component: SchemaViewRC,
  data: {
    schema: v.pipe(
      v.intersect([
        v.pipe(
          v.object({
            codeEditor: v.pipe(v.string(), setComponent('jsonEditor')),
          }),
          componentClass('flex flex-col gap-4'),
        ),
        v.pipe(
          v.object({
            jsonSchemaView: v.pipe(
              v.any(),
              setComponent('jsonSchema'),
              patchAsyncInputs({
                data: (field) => {
                  return field
                    .get(['#', 'codeEditor'])!
                    .form.control!.valueChanges.pipe(
                      filter(Boolean),
                      map((value) => {
                        return { schema: JSON.parse(value) };
                      }),
                    );
                },
              }),
            ),
          }),
        ),
      ]),
      asVirtualGroup(),
      componentClass('flex gap-4 *:flex-1 h-full mt-4'),
    ),
  },
};
