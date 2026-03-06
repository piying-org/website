import {
  ChangeDetectionStrategy,
  Component,
  inject,
  resource,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PiyingView } from '@piying/view-angular';
import { FieldGlobalConfig } from '../define';
import { CustomNgBuilder } from '../form/custom.builder';
const defaultValue = Promise.resolve(undefined);
@Component({
  selector: 'app-schema-view',
  templateUrl: './component.html',
  standalone: true,
  imports: [PiyingView],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchemaViewRC {
  route = inject(ActivatedRoute);

  context = this.route.snapshot.data['context']?.();
  schema = this.route.snapshot.data['schema']();
  model = resource({
    loader: async () => this.route.snapshot.data['model']?.() || defaultValue,
  });
  options = {
    context: this.context,
    fieldGlobalConfig: FieldGlobalConfig,
    builder: CustomNgBuilder as any,
  };
}
