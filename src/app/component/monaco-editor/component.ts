import { Component, ElementRef, forwardRef, inject } from '@angular/core';
import { BaseControl } from '../form/base.component.js';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
let amdInited$$: Promise<void> | undefined;
// todo 指令?
@Component({
  selector: 'div[type=code-editor]',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodeEditorComponent),
      multi: true,
    },
  ],
})
export default class CodeEditorComponent extends BaseControl {
  eleRef = inject<ElementRef<HTMLElement>>(ElementRef);
  instance;
  constructor() {
    super();
    this.instance = this.amdInit()?.then(() => this.init());
  }

  override writeValue(obj: any): void {
    super.writeValue(obj);
    this.instance?.then((instance) => {
      instance.setValue(obj ?? '');
    });
  }
  async amdInit() {
    if (document && !amdInited$$) {
      amdInited$$ = new Promise<void>((resolve) => {
        const el = document.createElement('script');
        el.src = './lib/monaco-editor/vs/loader.js';
        document.head.appendChild(el);
        el.onload = () => {
          (AMDLoader.global as any).require.config({
            paths: { vs: 'vs' },
            baseUrl: document.baseURI + 'lib/monaco-editor',
            preferScriptTags: true,
            'vs/nls': {
              availableLanguages: {
                '*': 'zh-cn',
              },
            },
          });

          (AMDLoader.global as any).require(['vs/editor/editor.main'], () => {
            resolve();
          });
        };
      });
      return amdInited$$;
    }
    return;
  }
  async init() {
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });

    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      allowNonTsExtensions: true,
      skipDefaultLibCheck: true,
      skipLibCheck: true,
    });
    const content = await fetch('./declaration/online-type.d.ts').then((a) =>
      a.text(),
    );
    const libUri = 'piying.ts';
    monaco.languages.typescript.javascriptDefaults.addExtraLib(content, libUri);

    const instance = monaco.editor.create(this.eleRef.nativeElement, {
      value: ``,
      language: 'javascript',
      minimap: { enabled: false },
    });
    // 临时格式化,应该时等到某个初始化结束再执行,但是没找到
    setTimeout(() => {
      instance.getAction('editor.action.formatDocument')!.run();
    }, 50);
    instance.onDidChangeModelContent((e) => {
      this.valueChange(instance.getValue());
    });
    return instance;
  }
}
