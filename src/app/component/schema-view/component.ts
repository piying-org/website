import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PiView } from '@piying/view-angular';
import { FieldGlobalConfig } from '../define';
import { CustomNgBuilder } from '../form/custom.builder';
import { AsyncPipe } from '@angular/common';
const defaultValue = Promise.resolve(undefined);
@Component({
  selector: 'app-schema-view',
  templateUrl: './component.html',
  standalone: true,
  imports: [PiView, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchemaViewRC {
  route = inject(ActivatedRoute);

  context = this.route.snapshot.data['context']?.();
  schema = this.route.snapshot.data['schema'];
  model = this.route.snapshot.data['model']?.() || defaultValue;
  options = {
    context: this.context,
    fieldGlobalConfig: FieldGlobalConfig,
    builder: CustomNgBuilder,
  };
}
