import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PiyingView } from '@piying/view-angular';
import { FieldGlobalConfig } from '../define';
import { CustomNgBuilder } from '../form/custom.builder';
import { AsyncPipe } from '@angular/common';
import { JsonSchemaHandle } from '../form/formly/json.handle';
import { JsonSchemaToValibot } from '../form/formly/formly-json-schema.service';
import { BaseControl } from '../form/base.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'app-json-schema-view',
  templateUrl: './component.html',
  standalone: true,
  imports: [PiyingView],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => JsonSchemaViewRC),
      multi: true,
    },
  ],
})
export default class JsonSchemaViewRC extends BaseControl {
  #convert = new JsonSchemaToValibot();
  data = input<Record<string, any>>();

  schema$$ = computed(() => {
    return this.#convert.toValibot(this.data()!['schema']);
  });

  model$$ = computed(() => {
    return this.data()!['model'];
  });
  options = {
    fieldGlobalConfig: FieldGlobalConfig,
    builder: CustomNgBuilder,
    handle: JsonSchemaHandle as any,
  };
}
