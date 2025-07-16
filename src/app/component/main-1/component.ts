import { Component } from '@angular/core';
import { PiView } from '@piying/view-angular';
import * as v from 'valibot';
import { FieldGlobalConfig } from '../define';
import { CustomNgBuilder } from '../form/custom.builder';
import { setComponent } from '@piying/view-angular-core';
import { HilightCodeDirective } from '../../directive/hilight-code.directive';
import Define from './const.txt';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'main-1',
  templateUrl: './component.html',
  imports: [PiView, HilightCodeDirective, RouterLink],
})
export class Main1Component {
  schema = v.pipe(
    v.object({
      support: v.pipe(
        v.optional(v.picklist(['angular', 'vue']), 'angular'),
        v.title('当前支持'),
      ),
      rating: v.pipe(
        v.optional(v.number()),
        setComponent('rating'),
        v.title('评价'),
      ),
      bool1: v.pipe(v.boolean(), v.title('使用皮影')),
    }),
    setComponent('fieldset'),
  );
  schemaCode = Define;
  options = {
    fieldGlobalConfig: FieldGlobalConfig,
    builder: CustomNgBuilder,
  };
  model = {};
}
