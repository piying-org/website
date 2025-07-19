import * as v from 'valibot';
import * as pyvac from '@piying/view-angular-core';
import * as pyva from '@piying/view-angular';
import * as rxjs from 'rxjs';
import * as directive from '../../directive/code-index';
export function codeEval(code: string) {
  const { map, skip, tap, BehaviorSubject } = rxjs;
  let result;
  try {
    result = new Function(
      'pyvac',
      'pyva',
      'directive',
      'map',
      'skip',
      'tap',
      'BehaviorSubject',
      'v',
      `let {FocusDirective}=directive;
      let {NFCSchema,setComponent,disableWhen,hideWhen,rawConfig,outputChange,patchAsyncInputs,setInputs,valueChange,setAlias,layout,asVirtualGroup,setWrappers,patchAttributes,setAttributes,patchAsyncProps,patchAsyncAttributes}=pyvac;
      let {patchAsyncDirective}=pyva;
      return ${code}`,
    )(pyvac, pyva, directive, map, skip, tap, BehaviorSubject, v);
    if (result && typeof result === 'object' && 'schema' in result) {
      return result;
    }
    return undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
