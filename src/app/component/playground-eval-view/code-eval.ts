import * as v from 'valibot';
import * as pyv from '@piying/view-angular-core';
import * as rxjs from 'rxjs';
export function codeEval(code: string) {
  const { map } = rxjs;
  let result;
  try {
    result = new Function(
      'pyv',
      'map',
      'v',
      `let {NFCSchema,setComponent,disableWhen,hideWhen,rawConfig,outputChange,patchAsyncInputs,setInputs,valueChange,setAlias,layout,asVirtualGroup}=pyv;
      return ${code}`,
    )(pyv, map, v);
    if (result && typeof result === 'object' && 'schema' in result) {
      return result;
    }
    return undefined;
  } catch (error) {
    return undefined;
  }
}
