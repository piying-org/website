import { NgSchemaHandle } from '@piying/view-angular';
import * as v from 'valibot';
import { SchemaOrPipe } from '@piying/valibot-visit';
export class JsonSchemaHandle extends NgSchemaHandle {
  override end(schema: SchemaOrPipe): void {
    super.end(schema);
    if (this.type === 'object') {
      this.type = 'formly-group';
    }
    if (this.type === 'array') {
      this.type = 'array-rw';
    }
    if (this.type === 'tuple') {
      this.type = 'formly-group';
    }
    if (this.type === 'multiselect') {
      this.attributes ??= {};
      this.attributes['class'] = 'h-[200px]';
    }
  }

  override validation(
    item: v.BaseValidation<any, any, v.BaseIssue<unknown>>,
  ): void {
    super.validation(item);
  }
}
