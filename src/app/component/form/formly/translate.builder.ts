import { computed, Injectable, isSignal, linkedSignal } from '@angular/core';
import {
  AngularFormBuilder,
  PiResolvedViewFieldConfig,
  NgSchemaHandle,
} from '@piying/view-angular';
import { deepEqual } from 'fast-equals';
function getSignalValue(inputs: any) {
  return isSignal(inputs) ? inputs() : inputs;
}
@Injectable()
export class TranslateNgBuilder extends AngularFormBuilder {
  override afterResolveConfig(
    rawConfig: NgSchemaHandle,
    config: PiResolvedViewFieldConfig,
  ) {
    const parsed = super.afterResolveConfig(rawConfig, config);
    const props = parsed.props;
    const inputs = parsed.inputs;
    const options$$ = computed(
      () => {
        const value = getSignalValue(props);
        return value?.['options'];
      },
      { equal: deepEqual },
    );
    const inputs$$ = linkedSignal(() => {
      let value = getSignalValue(inputs);
      if (rawConfig.type === 'picklist') {
        const options = options$$();
        if (options && !value.options) {
          value = { ...value, options };
        }
      }
      return value;
    });
    const propsData = props();
    config.context.lang.subscribe((lang: any) => {
      if (!lang) {
        return;
      }
      config.props.update((value) => ({
        ...value,
        title: config.context['i18n'][lang][propsData['title']],
      }));
    });
    return {
      ...parsed,
      inputs: inputs$$,
    } as any;
  }
}
