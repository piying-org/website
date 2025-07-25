import { Component, computed, input } from '@angular/core';
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

  config$$ = computed(() => {
    const code = this.configCode();
    if (!code) {
      return;
    }
    return codeEval(code);
  });
  #context$$ = computed(() => ({
    ...PlayContext,
    ...this.config$$()?.context,
  }));
  options$$ = computed(() => ({
    fieldGlobalConfig: FieldGlobalConfig,
    builder: getBuilderType(this.config$$().builderType),
    context: this.#context$$(),
  }));
}
