import { Component, computed, input } from '@angular/core';
import { PiView } from '@piying/view-angular';
import { FieldGlobalConfig } from '../define';
import { CustomNgBuilder } from '../form/custom.builder';
import { codeEval } from './code-eval';
import { PlayContext } from './context';
@Component({
  selector: 'app-playground-eval-view',
  templateUrl: './component.html',
  standalone: true,
  imports: [PiView],
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
    builder: CustomNgBuilder,
    context: this.#context$$(),
  }));
}
