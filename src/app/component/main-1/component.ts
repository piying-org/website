import { Component } from '@angular/core';
import { PiyingView } from '@piying/view-angular';
import * as v from 'valibot';
import { FieldGlobalConfig } from '../define';
import { CustomNgBuilder } from '../form/custom.builder';
import { setComponent } from '@piying/view-angular-core';
import { HilightCodeDirective } from '../../directive/hilight-code.directive';
import Define from './const.txt';
import { RouterLink } from '@angular/router';
import { $localize } from '@cyia/localize';
@Component({
  selector: 'main-1',
  templateUrl: './component.html',
  imports: [PiyingView, HilightCodeDirective, RouterLink],
})
export class Main1Component {
  readonly title = $localize`前端表单解决方案`;
  readonly subTitle = $localize`皮影提供了可以在任意平台上使用的
          <br />
          快速组件布局,定位,事件融合监听及
          <br />
          表单设计,验证,分区禁用,类型安全等功能`;
  readonly btn1 = $localize`查看用例`;
  readonly btn2 = $localize`快速开始`;
  schema = v.pipe(
    v.object({
      support: v.pipe(
        v.optional(
          v.picklist(['Angular', 'Vue', 'React', 'Svelte', 'Solid']),
          'Angular',
        ),
        v.title($localize`当前支持`),
      ),
      rating: v.pipe(
        v.optional(v.number()),
        setComponent('rating'),
        v.title($localize`评价`),
      ),
      usePiying: v.pipe(v.boolean(), v.title($localize`使用皮影`)),
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
