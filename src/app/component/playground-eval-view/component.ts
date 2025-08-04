import { Component, computed, input, resource } from '@angular/core';
import { PiyingView } from '@piying/view-angular';
import { FieldGlobalConfig } from '../define';
import { codeEval } from './code-eval';
import { PlayContext } from './context';
import { getBuilderType } from './builder-type';
@Component({
  selector: 'app-playground-eval-view',
  templateUrl: './component.html',
  standalone: true,
  imports: [PiyingView],
})
export class PlayGroundEvalViewNFCC {
  configCode = input<string>();

  config2$ = resource({
    params: () => {
      return this.configCode();
    },
    loader: async ({ params }) => {
      if (!params) {
        return undefined;
      }
      return codeEval(params);
    },
  });
  #context$$ = computed(() => ({
    ...PlayContext,
    ...this.config2$.value()?.context,
  }));
  options$$ = computed(() => {
    let status = this.config2$.hasValue();
    if (!status) {
      return;
    }
    return {
      fieldGlobalConfig: FieldGlobalConfig,
      builder: getBuilderType(this.config2$.value().builderType),
      context: this.#context$$(),
    };
  });
}
