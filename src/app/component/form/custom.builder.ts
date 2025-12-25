import { computed, Injectable, isSignal } from '@angular/core';
import {
  AngularFormBuilder,
  PiResolvedViewFieldConfig,
  NgSchemaHandle,
} from '@piying/view-angular';
import { deepEqual } from 'fast-equals';

@Injectable()
export class CustomNgBuilder extends AngularFormBuilder {
  override afterResolveConfig(
    rawConfig: NgSchemaHandle,
    config: PiResolvedViewFieldConfig,
  ) {
    const parsed = super.afterResolveConfig(rawConfig, config) ?? config;
    const placeholder$$ = computed(() => {
      return parsed.props()?.['metadata']?.['placeholder'];
    });

    const placeholder = placeholder$$();
    if (typeof placeholder === 'string') {
      parsed.inputs.connect('placeholder', placeholder);
    }
    if (rawConfig.type === 'picklist') {
      const options$$ = computed(
        () => {
          return parsed.props()?.['options'];
        },
        { equal: deepEqual },
      );
      const options = options$$();
      if (options && !parsed.inputs()?.['options']) {
        parsed.inputs.connect('options', options);
      }
    }
    return parsed;
  }
}
