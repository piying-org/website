export type * as v from 'valibot';
import * as V from 'valibot';

export * from '@piying/view-angular-core';
import * as PYV from '@piying/view-angular-core';
import * as rxjs from 'rxjs';
declare global {
  export const v: typeof V;
  export const NFCSchema: (typeof PYV)['NFCSchema'];
  export const setComponent: (typeof PYV)['setComponent'];
  export const disableWhen: (typeof PYV)['disableWhen'];
  export const hideWhen: (typeof PYV)['hideWhen'];
  export const rawConfig: (typeof PYV)['rawConfig'];
  export const outputChange: (typeof PYV)['outputChange'];
  export const patchAsyncInputs: (typeof PYV)['patchAsyncInputs'];
  export const setInputs: (typeof PYV)['setInputs'];
  export const valueChange: (typeof PYV)['valueChange'];
  export const setAlias: (typeof PYV)['setAlias'];
  export const layout: (typeof PYV)['layout'];
  export const map: (typeof rxjs)['map'];
}
export {};
