import { Component, computed, ElementRef, inject } from '@angular/core';
import { PiyingView } from '@piying/view-angular';

import { codeEval } from '../../component/playground-eval-view/code-eval';
import { FieldGlobalConfig } from '../../component/define';
import { CustomNgBuilder } from '../../component/form/custom.builder';
import { CodeMap } from '../../directive/markdown.directive';
import { PlayContext } from '../../component/playground-eval-view/context';
import { getBuilderType } from '../../component/playground-eval-view/builder-type';
@Component({
  selector: 'app-eval-view',
  templateUrl: './component.html',
  standalone: true,
  imports: [PiyingView],
})
export class EvalViewWC {
  #el = inject<ElementRef<HTMLElement>>(ElementRef);
  config = (() => {
    const index = +this.#el.nativeElement.dataset['codeIndex']!;
    const str = CodeMap.get(index)!;
    if (str.startsWith('{')) {
      return codeEval(`(() => {
        return ${str}
        })()`);
    }
    return codeEval(`(() => {
      let schema=${str}
      return {schema:schema}
      })()`);
  })();
  #context$$ = computed(() => ({
    ...PlayContext,
    ...this.config.context,
  }));
  options = {
    fieldGlobalConfig: FieldGlobalConfig,
    builder: getBuilderType(this.config.builderType),
    context: this.#context$$(),
  };
}
