import {
  Component,
  computed,
  ElementRef,
  inject,
  resource,
} from '@angular/core';
import { PiyingView } from '@piying/view-angular';

import { codeEval } from '../../component/playground-eval-view/code-eval';
import { FieldGlobalConfig } from '../../component/define';
import { CodeMap } from '../../directive/markdown.directive';

import { getBuilderType } from '../../component/playground-eval-view/builder-type';
@Component({
  selector: 'app-eval-view',
  templateUrl: './component.html',
  standalone: true,
  imports: [PiyingView],
})
export class EvalViewWC {
  #el = inject<ElementRef<HTMLElement>>(ElementRef);
  config2$ = resource({
    params: () => {
      const index = +this.#el.nativeElement.dataset['codeIndex']!;
      const str = CodeMap.get(index)!;
      return str;
    },
    loader: ({ params }) => {
      if (params.startsWith('{')) {
        return codeEval(`(() => {
        return ${params}
        })()`);
      }
      return codeEval(`(() => {
      let schema=${params}
      return {schema:schema}
      })()`);
    },
  });

  #context$$ = computed(() => ({
    ...this.config2$.value().context,
  }));
  options$$ = computed(() => {
    const status = this.config2$.hasValue();
    if (!status) {
      return;
    }

    return {
      fieldGlobalConfig: FieldGlobalConfig,
      builder: getBuilderType(this.config2$.value().builderType) as any,
      context: this.#context$$(),
    };
  });
}
