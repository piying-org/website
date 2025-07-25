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
export class CustomNgBuilder extends AngularFormBuilder {
  override afterResolveConfig(
    rawConfig: NgSchemaHandle,
    config: PiResolvedViewFieldConfig,
  ) {
    const parsed = super.afterResolveConfig(rawConfig, config) ?? config;
    const props = parsed.props;
    const inputs = parsed.inputs;
    const title$$ = computed(() => {
      const value = getSignalValue(props);
      return value?.['title'];
    });
    const placeholder$$ = computed(() => {
      const value = getSignalValue(props);
      return value?.['metadata']?.['placeholder'];
    });
    const options$$ = computed(
      () => {
        const value = getSignalValue(props);
        return value?.['options'];
      },
      { equal: deepEqual },
    );
    const inputs$$ = linkedSignal(() => {
      let value = getSignalValue(inputs);
      const placeholder = placeholder$$();
      if (typeof placeholder === 'string') {
        value = { ...value, placeholder };
      }
      if (rawConfig.type === 'picklist') {
        const options = options$$();
        if (options && !value.options) {
          value = { ...value, options };
        }
      }
      return value;
    });

    return {
      ...parsed,
      inputs: inputs$$,
    } as any;
  }
}
