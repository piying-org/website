import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as v from 'valibot';
import { FieldGlobalConfig } from './component/define';
import { CustomNgBuilder } from './component/form/custom.builder';
import { setComponent } from '@piying/view-angular-core';
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [RouterOutlet],
})
export class App {
  schema = v.object({
    input1: v.string(),
    input2: v.pipe(v.string(), setComponent('textarea')),
    list: v.picklist(['hello', 'world']),
    bool1: v.boolean(),
    bool2: v.pipe(v.boolean(), setComponent('toggle')),
    num1: v.pipe(v.number(), setComponent('rating')),
    rangeNum1: v.pipe(v.number(), setComponent('range')),
    fileInput1: v.pipe(v.any(), setComponent('fileInput')),

    fieldset: v.pipe(
      v.object({
        input1: v.pipe(v.string(), v.title('测试1')),
      }),
      setComponent('fieldset'),
      v.title('组1'),
    ),
  });
  options = {
    fieldGlobalConfig: FieldGlobalConfig,
    builder: CustomNgBuilder,
  };
  model = { input1: '123', list: 'hello', bool1: true, num1: 5 };
  constructor() {}
  modelChange(event: any) {
    console.log(event);
  }
}
