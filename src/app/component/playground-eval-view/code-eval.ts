import * as v from 'valibot';
import * as pyv from '@piying/view-angular-core';
import * as rxjs from 'rxjs';
export function codeEval(code: string) {
  const { map,skip,tap } = rxjs;
  let result;
  try {
    result = new Function(
      'pyv',
      'map',
      'skip',
      'tap',
      'v',
      `let {NFCSchema,setComponent,disableWhen,hideWhen,rawConfig,outputChange,patchAsyncInputs,setInputs,valueChange,setAlias,layout,asVirtualGroup,setWrappers}=pyv;
      return ${code}`,
    )(pyv, map,skip,tap, v);
    if (result && typeof result === 'object' && 'schema' in result) {
      return result;
    }
    return undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
