import * as directive from '../../directive/code-index';
export async function codeEval(code: string) {
  const { map, skip, tap, BehaviorSubject, of } = await import('rxjs');
  const pyva = await import('@piying/view-angular');
  const pyvac = await import('@piying/view-angular-core');
  const v = await import('valibot');  
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
      'of',
      'v',
      `let {FocusDirective}=directive;
      let {NFCSchema,setComponent,disableWhen,hideWhen,rawConfig,outputChange,patchAsyncInputs,setInputs,valueChange,setAlias,layout,asVirtualGroup,setWrappers,patchAttributes,setAttributes,patchAsyncProps,patchAsyncAttributes,patchInputs ,formConfig,patchOutputs,mergeOutputs,patchProps ,asControl,componentClass,topClass,nonFieldControl}=pyvac;
      let {patchAsyncDirective}=pyva;
      return ${code}`,
    )(pyvac, pyva, directive, map, skip, tap, BehaviorSubject, of, v);
    if (result && typeof result === 'object' && 'schema' in result) {
      return result;
    }
    return undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
