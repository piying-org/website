import * as V from 'valibot';
export { V };

import * as PVA from '@piying/view-angular';
export { PVA };

import * as PYVAC from '@piying/view-angular-core';
export { PYVAC };

import * as rxjs from 'rxjs';
export { rxjs };

import * as directive from '../app/directive/code-index';
export { directive };
declare global {
  export const v: typeof V;
  export const NFCSchema: (typeof PYVAC)['NFCSchema'];
  export const setComponent: (typeof PYVAC)['setComponent'];
  export const disableWhen: (typeof PYVAC)['disableWhen'];
  export const hideWhen: (typeof PYVAC)['hideWhen'];
  export const rawConfig: (typeof PYVAC)['rawConfig'];
  export const outputChange: (typeof PYVAC)['outputChange'];
  export const patchAsyncInputs: (typeof PYVAC)['patchAsyncInputs'];
  export const setInputs: (typeof PYVAC)['setInputs'];
  export const valueChange: (typeof PYVAC)['valueChange'];
  export const setAlias: (typeof PYVAC)['setAlias'];
  export const layout: (typeof PYVAC)['layout'];
  export const asVirtualGroup: (typeof PYVAC)['asVirtualGroup'];
  export const setWrappers: (typeof PYVAC)['setWrappers'];
  export const patchAsyncAttributes: (typeof PYVAC)['patchAsyncAttributes'];
  export const patchAsyncProps: (typeof PYVAC)['patchAsyncProps'];
  export const setAttributes: (typeof PYVAC)['setAttributes'];
  export const patchAttributes: (typeof PYVAC)['patchAttributes'];
  export const patchInputs: (typeof PYVAC)['patchInputs'];
  export const nonFieldControl: (typeof PYVAC)['nonFieldControl'];
  export const topClass: (typeof PYVAC)['topClass'];
  export const componentClass: (typeof PYVAC)['componentClass'];
  export const asControl: (typeof PYVAC)['asControl'];
  export const patchProps: (typeof PYVAC)['patchProps'];
  export const mergeOutputs: (typeof PYVAC)['mergeOutputs'];
  export const patchOutputs: (typeof PYVAC)['patchOutputs'];
  export const formConfig: (typeof PYVAC)['formConfig'];
  export const patchAsyncDirective: (typeof PVA)['patchAsyncDirective'];
  export const map: (typeof rxjs)['map'];
  export const skip: (typeof rxjs)['skip'];
  export const tap: (typeof rxjs)['tap'];
  export const of: (typeof rxjs)['of'];
  export const BehaviorSubject: (typeof rxjs)['BehaviorSubject'];
  export const FocusDirective: (typeof directive)['FocusDirective'];
}
export {};
