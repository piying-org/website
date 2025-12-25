# 快速开始

## 模板实例

- 如果您有相关开发经验,可以先拉取相关模板查看源码

<custom-tabs>
<custom-tab data-label="Angular">
```shell
https://github.com/piying-org/piying-view-angular-template
```
</custom-tab>
<custom-tab data-label="Vue">
```shell
https://github.com/piying-org/piying-view-vue-template
```
</custom-tab>
<custom-tab data-label="React">
```shell
https://github.com/piying-org/piying-view-react-template
```
</custom-tab>
<custom-tab data-label="Svelte">
```shell
https://github.com/piying-org/piying-view-svelte-template
```
</custom-tab>
<custom-tab data-label="Solid">
```shell
https://github.com/piying-org/piying-view-solid-template
```
</custom-tab>
</custom-tabs>

## 安装

- 确保当前项目可以正常运行
- 安装以下依赖

<custom-tabs>
<custom-tab data-label="Angular">
```shell
npm i @piying/view-angular
npm i valibot
```
</custom-tab>
<custom-tab data-label="Vue">
```shell
npm i @piying/view-vue
npm i valibot
```
</custom-tab>
<custom-tab data-label="React">
```shell
npm i @piying/view-react
npm i valibot
```
</custom-tab>
<custom-tab data-label="Svelte">
```shell
npm i @piying/view-svelte
npm i valibot
```
</custom-tab>
<custom-tab data-label="Solid">
```shell
npm i @piying/view-solid
npm i valibot
```
</custom-tab>
</custom-tabs>

## 组件实现

### 普通组件

- 和正常开发时完全一样,在定义处配置input/output及其他属性传入

### 控件

- 皮影在所有库/框架上都实现了`ControlValueAccessor`,通过实现相关方法,使组件能够自动接入控件

<custom-tabs>
<custom-tab data-label="Angular">
```typescript
import { Component, forwardRef,  } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControl } from '@piying/view-angular';
@Component({
  selector: 'app-input',
  imports: [FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() =&gt; InputFCC),
      multi: true,
    },
  ],
  template:`&lt;input type=&quot;text&quot; [ngModel]=&quot;value$()&quot; (ngModelChange)=&quot;valueChange($event)&quot;&gt;`
})
export class InputFCC extends BaseControl {}
```
</custom-tab>
<custom-tab data-label="Vue">
```html
&lt;script setup lang=&quot;ts&quot;&gt;
import { useControlValueAccessor } from '@piying/view-vue'
import { vModelDynamic } from 'vue'
const { cva, cvaa:{value, disabled, valueChange, touchedChange} } = useControlValueAccessor()
defineExpose({ cva })
&lt;/script&gt;
&lt;template&gt;
  &lt;input
    type=&quot;text&quot;
    class=&quot;input&quot;
    v-model-dynamic=&quot;value&quot;
    :onUpdate:modelValue=&quot;valueChange&quot;
    v-bind:disabled=&quot;disabled&quot;
    @blur=&quot;touchedChange&quot;
  /&gt;
&lt;/template&gt;
&lt;style&gt;&lt;/style&gt;
```
</custom-tab>
<custom-tab data-label="React">
```typescript
import type { ControlValueAccessor } from '@piying/view-core';
import { CVA, useControlValueAccessor, useInputTextModel } from '@piying/view-react';
import { useImperativeHandle } from 'react';
interface PiInputOptions {
  [CVA]: React.RefObject&lt;ControlValueAccessor&gt;;
}
export function InputText(props: PiInputOptions) {
  const { cva, cvaa } = useControlValueAccessor();
  useImperativeHandle(props[CVA], () =&gt; cva, [cva]);
  const textModel = useInputTextModel(cvaa, false);
  return (
    &lt;&gt;
      &lt;input type=&quot;text&quot; className=&quot;input&quot; {...textModel} /&gt;
    &lt;/&gt;
  );
}
```
</custom-tab>
<custom-tab data-label="Svelte">
```html
&lt;script lang=&quot;ts&quot;&gt;
  import { useControlValueAccessor } from &apos;@piying/view-svelte&apos;;
  const { cva, cvaa } = useControlValueAccessor();
  export { cva };
&lt;/script&gt;
&lt;input
  class=&quot;input&quot;
  type=&quot;text&quot;
  bind:value={() =&gt; cvaa.value, (v) =&gt; cvaa.valueChange(v)}
  disabled={cvaa.disabled}
  onblur={cvaa.touchedChange}
/&gt;
```
</custom-tab>
<custom-tab data-label="Solid">
```typescript
import type { ControlValueAccessor } from &apos;@piying/view-core&apos;;
import { CVA, useControlValueAccessor, useInputTextModel } from &apos;@piying/view-solid&apos;;
import { createMemo, type Setter } from &apos;solid-js&apos;;
interface PiInputOptions {
  [CVA]: Setter&lt;ControlValueAccessor&gt;;
}
export function InputText(props: PiInputOptions) {
  const result = useControlValueAccessor();
  createMemo(() =&gt; {
    props[CVA](result.cva);
  });
  const textModel = useInputTextModel(result.cvaa, () =&gt; false);
  return (
    &lt;&gt;
      &lt;input type=&quot;text&quot; class=&quot;input&quot; {...textModel()} /&gt;
    &lt;/&gt;
  );
}
```
</custom-tab>
</custom-tabs>

### 包装器

- 实现`组件`的时候,只需要实现最核心的组件内容即可,不需要将验证/标签/提示内容一并实现
- 包装器可以让组件拥有额外能力
- 多个包装器可以通过排列组合使组件产生更多显示效果,并且减少代码耦合,易于维护

<custom-tabs>
<custom-tab data-label="Angular">
```html
&lt;div class=&quot;flex gap-2 items-center&quot;&gt;
  @if (field$$().props()[&quot;title&quot;]; as title) {
    &lt;span class=&quot;label&quot;&gt;{{ title }}&lt;/span&gt;
  }
  &lt;ng-container insertField&gt;&lt;/ng-container&gt;
&lt;/div&gt;
```
```typescript
import { Component, computed } from '@angular/core';
import { PiyingViewWrapperBase } from '@piying/view-angular';
import { setGlobalConfig, summarize } from 'valibot';
@Component({
  selector: 'label-wrapper',
  templateUrl: './component.html',
})
export class LabelWC extends PiyingViewWrapperBase {
}
```
</custom-tab>
<custom-tab data-label="Vue">
```html
&lt;script setup lang=&quot;ts&quot;&gt;
import { PI_VIEW_FIELD_TOKEN, signalToRef } from '@piying/view-vue'
import { inject } from 'vue'
const field = inject(PI_VIEW_FIELD_TOKEN)
const props = signalToRef(() =&gt; field?.value.props())
&lt;/script&gt;
&lt;template&gt;
    &lt;div class=&quot;flex gap-2 items-center&quot;&gt;
        &lt;span class=&quot;label&quot; v-if=&quot;props['title']&quot;&gt;{{ props['title'] }}&lt;/span&gt;
        &lt;slot&gt;&lt;/slot&gt;
    &lt;/div&gt;
&lt;/template&gt;
&lt;style&gt;&lt;/style&gt;
```
</custom-tab>
<custom-tab data-label="React">
```typescript
import { PI_VIEW_FIELD_TOKEN, useSignalToRef } from '@piying/view-react';
import { useContext } from 'react';
export function LabelWC(props: { children: any }) {
  const field = useContext(PI_VIEW_FIELD_TOKEN);
  const props2 = useSignalToRef(field, () =&gt; field?.props());
  return (
    &lt;&gt;
      &lt;div className=&quot;flex gap-2 items-center&quot;&gt;
        {props2?.['title'] ? &lt;span className=&quot;label&quot;&gt;{props2['title']}&lt;/span&gt; : undefined}
        {props.children}
      &lt;/div&gt;
    &lt;/&gt;
  );
}
```
</custom-tab>
<custom-tab data-label="Svelte">
```html
&lt;script lang=&quot;ts&quot;&gt;
  import { PI_VIEW_FIELD_TOKEN, signalToState } from &apos;@piying/view-svelte&apos;;
  import { getContext } from &apos;svelte&apos;;
  let dProps: { children: any;  } = $props();
  const field = getContext&lt;PI_VIEW_FIELD_TOKEN&gt;(PI_VIEW_FIELD_TOKEN);
  const fProps = signalToState(() =&gt; field().props());
&lt;/script&gt;
&lt;div class=&quot;flex gap-2 items-center&quot;&gt;
  {#if fProps()![&apos;title&apos;]}
    &lt;span class=&quot;label&quot; &gt;{ fProps()![&apos;title&apos;] }&lt;/span&gt;
  {/if}
  {@render dProps.children()}
&lt;/div&gt;
```
</custom-tab>
<custom-tab data-label="Solid">
```typescript
import { PI_VIEW_FIELD_TOKEN, createSignalConvert } from &apos;@piying/view-solid&apos;;
import clsx from &apos;clsx&apos;;
import { useContext, createMemo, Show } from &apos;solid-js&apos;;
export function LabelWrapper(props: { children: any }) {
  const field = useContext(PI_VIEW_FIELD_TOKEN)!;
  const props2 = createSignalConvert(() =&gt; {
    return field.props();
  });
  const attributes = createSignalConvert(() =&gt; field.attributes());
  const isRequired = createSignalConvert(() =&gt; !!field.form.control?.required$$());
  const wrapperClass = createMemo(() =&gt; {
    return clsx(&apos;flex gap-2&apos;, {
      &apos;flex-col&apos;: props2()[&apos;titlePosition&apos;] === &apos;top&apos;,
      &apos;items-center&apos;: props2()[&apos;titlePosition&apos;] !== &apos;top&apos;,
    });
  });
  const title = createMemo(() =&gt; props2()[&apos;title&apos;]);
  return (
    &lt;&gt;
      &lt;div class={wrapperClass()}&gt;
        &lt;Show
          when={
            (!props2()[&apos;titlePosition&apos;] || props2()[&apos;titlePosition&apos;] === &apos;left&apos; || props2()[&apos;titlePosition&apos;] === &apos;top&apos;) &amp;&amp; props2()[&apos;title&apos;]
          }
        &gt;
          &lt;label for={attributes()?.[&apos;id&apos;]}&gt;
            &lt;Show when={isRequired()}&gt;
              &lt;span class=&quot;text-red-500&quot;&gt;*&lt;/span&gt;
            &lt;/Show&gt;
            &lt;span class=&quot;label&quot;&gt;{title()}&lt;/span&gt;
          &lt;/label&gt;
        &lt;/Show&gt;
        {props.children}
        &lt;Show when={props2()[&apos;titlePosition&apos;] === &apos;right&apos; &amp;&amp; props2()[&apos;title&apos;]}&gt;
          &lt;label for={attributes()?.[&apos;id&apos;]}&gt;
            &lt;Show when={isRequired()}&gt;
              &lt;span class=&quot;text-red-500&quot;&gt;*&lt;/span&gt;
            &lt;/Show&gt;
            &lt;span class=&quot;label&quot;&gt;{title()}&lt;/span&gt;
          &lt;/label&gt;
        &lt;/Show&gt;
      &lt;/div&gt;
    &lt;/&gt;
  );
}
```
</custom-tab>
</custom-tabs>

### 分组

- 当需要调整多个组件的布局,样式及相关显示时,就需要分组
  > `object`/`intersect`/`union`/`tuple`/`array`类型时可使用
- 所有库/框架都实现了最基础的`PiyingViewGroup`,但这个并没有任何样式,排版,所以往往需要按要求自定义

<custom-tabs>
<custom-tab data-label="Angular">
```html
&lt;fieldset
  class=&quot;fieldset bg-base-200 border-base-300 rounded-box border p-4 w-full&quot;
&gt;
  @if (field().props()[&quot;title&quot;]; as title) {
    &lt;legend class=&quot;fieldset-legend&quot;&gt;{{ title }}&lt;/legend&gt;
  }
  @for (field of fields(); track field.id || $index) {
    &lt;ng-container
      *ngTemplateOutlet=&quot;fieldTemplateRef(); context: { $implicit: field }&quot;
    &gt;&lt;/ng-container&gt;
  }
&lt;/fieldset&gt;
```
```typescript
import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PI_VIEW_FIELD_TOKEN, PiyingViewGroupBase } from '@piying/view-angular';
@Component({
  selector: 'fieldset-group',
  templateUrl: './component.html',
  imports: [NgTemplateOutlet],
})
export class FieldsetFGC extends PiyingViewGroupBase {
  field = inject(PI_VIEW_FIELD_TOKEN);
}
```
</custom-tab>
<custom-tab data-label="Vue">
```html
&lt;script setup lang=&quot;ts&quot;&gt;
import type { PiResolvedViewFieldConfig } from '@piying/view-vue'
import { PI_VIEW_FIELD_TOKEN, PiyingFieldTemplate, signalToRef } from '@piying/view-vue'
import { inject } from 'vue'
const dInputs = defineProps&lt;{
  fields: PiResolvedViewFieldConfig[]
}&gt;()
const field = inject(PI_VIEW_FIELD_TOKEN)
const props = signalToRef(() =&gt; field?.value.props())
&lt;/script&gt;
&lt;template&gt;
  &lt;fieldset class=&quot;fieldset bg-base-200 border-base-300 rounded-box border p-4 w-full&quot;&gt;
    &lt;legend class=&quot;fieldset-legend&quot; v-if=&quot;props['title']&quot;&gt;{{ props['title'] }}&lt;/legend&gt;
    &lt;template v-for=&quot;(field, index) in dInputs.fields&quot; :key=&quot;index&quot;&gt;
      &lt;piying-field-template :field=&quot;field!&quot;&gt;&lt;/piying-field-template&gt;
    &lt;/template&gt;
  &lt;/fieldset&gt;
&lt;/template&gt;
&lt;style&gt;&lt;/style&gt;
```
</custom-tab>
<custom-tab data-label="React">
```typescript
import { PI_VIEW_FIELD_TOKEN, useSignalToRef, type PiResolvedViewFieldConfig, PiyingFieldTemplate } from '@piying/view-react';
import { useContext } from 'react';
export function FieldsetFGC(props: { fields: PiResolvedViewFieldConfig[] }) {
  const field = useContext(PI_VIEW_FIELD_TOKEN);
  const props2 = useSignalToRef(field, (field) =&gt; field?.props());
  return &lt;fieldset className=&quot;fieldset bg-base-200 border-base-300 rounded-box border p-4 w-full&quot;&gt;
        {props2?.['title'] ? &lt;legend className=&quot;fieldset-legend&quot;&gt;{props2['title']}&lt;/legend&gt; : undefined}
        {props.fields.map((field, index) =&gt; {
          return &lt;PiyingFieldTemplate field={field} key={index}&gt;&lt;/PiyingFieldTemplate&gt;;
        })}
      &lt;/fieldset&gt;;
}
```
</custom-tab>
<custom-tab data-label="Svelte">
```html
&lt;script lang=&quot;ts&quot;&gt;
  import { PI_VIEW_FIELD_TOKEN, PiyingFieldTemplate, signalToState } from &apos;@piying/view-svelte&apos;;
  import { getContext } from &apos;svelte&apos;;
  const field = getContext&lt;PI_VIEW_FIELD_TOKEN&gt;(PI_VIEW_FIELD_TOKEN);
  const props = signalToState(() =&gt; field().props())!;
  const children = signalToState(() =&gt; field().children!())!;
&lt;/script&gt;
&lt;fieldset class=&quot;fieldset bg-base-200 border-base-300 rounded-box border p-4 w-full&quot;&gt;
  {#if props()![&apos;title&apos;]}
    &lt;legend class=&quot;fieldset-legend&quot;&gt;{props()![&apos;title&apos;]}&lt;/legend&gt;
  {/if}
  {#each children()! as field, i (i)}
    &lt;PiyingFieldTemplate {field}&gt;&lt;/PiyingFieldTemplate&gt;
  {/each}
&lt;/fieldset&gt;
```
</custom-tab>
<custom-tab data-label="Solid">
```typescript
import { PI_VIEW_FIELD_TOKEN, createSignalConvert, PiyingFieldTemplate } from &apos;@piying/view-solid&apos;;
import { For, Show, useContext } from &apos;solid-js&apos;;
export function FieldsetGroup(_: {}) {
  const field = useContext(PI_VIEW_FIELD_TOKEN);
  const props2 = createSignalConvert(() =&gt; field?.props());
  const children = createSignalConvert(() =&gt; field?.children!())!;
  return (
    &lt;&gt;
      &lt;fieldset class=&quot;fieldset bg-base-200 border-base-300 rounded-box border p-4 w-full&quot;&gt;
        &lt;Show when={props2()?.[&apos;title&apos;]} keyed&gt;
          {(title) =&gt; &lt;legend class=&quot;fieldset-legend&quot;&gt;{title}&lt;/legend&gt;}
        &lt;/Show&gt;
        &lt;For each={children()}&gt;
          {(field) =&gt; {
            return &lt;PiyingFieldTemplate field={field}&gt;&lt;/PiyingFieldTemplate&gt;;
          }}
        &lt;/For&gt;
      &lt;/fieldset&gt;
    &lt;/&gt;
  );
}
```
</custom-tab>
</custom-tabs>

## 注册组件

- 所有要使用的组件,最好都在配置中先进行注册,方便引用
- 组件注册支持懒加载

```typescript
export const FieldGlobalConfig = {
  types: {
    string: {
      type: InputFCC,
    },
    fieldset: {
      type: FieldsetFGC,
    },
  },
  wrappers: {
    label: {
      type: LabelWC,
    },
  },
} as PiViewConfig;
```

## 调用

<custom-tabs>
<custom-tab data-label="Angular">
```html
&lt;piying-view [schema]=&quot;schema&quot; [options]=&quot;options&quot; (modelChange)=&quot;modelChagned($event)&quot;&gt;&lt;/piying-view&gt;
```
```typescript
import { Component, OnInit } from '@angular/core';
import {
  actions,
  setComponent,
} from '@piying/view-angular-core';
import * as v from 'valibot';
import { PiyingView } from '@piying/view-angular';
@Component({
  selector: 'app-piying',
  templateUrl: './component.html',
  imports: [PiyingView],
})
export class PiyingPage {
  schema = v.pipe(
    v.object({
      text1: v.pipe(v.optional(v.string()), v.title('text1-label'),actions.wrappers.set(['label'])),
    }),
    v.title('form'),
    setComponent('fieldset')
  );
  options = {
    fieldGlobalConfig: FieldGlobalConfig,
  };
  modelChagned(event: any) {
    console.log(event);
  }
}
```
</custom-tab>
<custom-tab data-label="Vue">
```html
&lt;script setup lang=&quot;ts&quot;&gt;
import { PiyingView } from '@piying/view-vue'
import { actions, setComponent } from '@piying/view-core'
import * as v from 'valibot'
import { ref } from 'vue'
const schema = v.pipe(
  v.object({
    text1: v.pipe(v.optional(v.string()), v.title('text1-label'),actions.wrappers.set(['label'])),
  }),
  v.title('form'),
  setComponent('fieldset'),
)
const options = {
  fieldGlobalConfig: FieldGlobalConfig,
}
function modelChange(event: any) {
  console.log(event)
}
const model = ref({})
&lt;/script&gt;
&lt;template&gt;
  &lt;piying-view
    :schema=&quot;schema&quot;
    :options=&quot;options&quot;
    :model-value=&quot;model&quot;
    @update:model-value=&quot;modelChange&quot;
  &gt;&lt;/piying-view&gt;
&lt;/template&gt;
```
</custom-tab>
<custom-tab data-label="React">
```typescript
import * as v from 'valibot';
import { setComponent, actions } from '@piying/view-core';
import { PiyingView } from '@piying/view-react';
const schema = v.pipe(
  v.object({
    text1: v.pipe(v.optional(v.string()), v.title('text1-label'), actions.wrappers.set(['label'])),
  }),
  v.title('form'),
  setComponent('fieldset')
);
const options = {
  fieldGlobalConfig: FieldGlobalConfig,
};
export function PiyingPage() {
  function modelChange(event: any) {
    console.log(event);
  }
  return &lt;PiyingView schema={schema} options={options} modelChange={modelChange}&gt;&lt;/PiyingView&gt;;
}
```
</custom-tab>
<custom-tab data-label="Svelte">
```html
&lt;script lang=&quot;ts&quot;&gt;
  import { PiyingView } from &apos;@piying/view-svelte&apos;;
  import { setComponent, actions } from &apos;@piying/view-core&apos;;
  import * as v from &apos;valibot&apos;;
  const schema = v.pipe(
    v.object({
      text1: v.pipe(v.optional(v.string()), v.title(&apos;text1-label&apos;), actions.wrappers.set(['label'])),
    }),
    v.title(&apos;form&apos;),
    setComponent(&apos;fieldset&apos;)
  );
  const options = {
    fieldGlobalConfig: FieldGlobalConfig,
  };
  function modelChange(event: any) {
    console.log(event);
  }
  const model = $state({});
&lt;/script&gt;
&lt;PiyingView {schema} {options} {model} {modelChange}&gt;&lt;/PiyingView&gt;
```
</custom-tab>
<custom-tab data-label="Solid">
```typescript
import * as v from &apos;valibot&apos;;
import { setComponent, actions } from &apos;@piying/view-core&apos;;
import { PiyingView } from &apos;@piying/view-solid&apos;;
const schema = v.pipe(
  v.object({
    text1: v.pipe(v.optional(v.string()), v.title(&apos;text1-label&apos;), actions.wrappers.set(['label'])),
  }),
  v.title(&apos;form&apos;),
  setComponent(&apos;fieldset&apos;)
);
const options = {
  fieldGlobalConfig: FieldGlobalConfig,
};
export function PiyingPage() {
  function modelChange(event: any) {
    console.log(event);
  }
  return (
    &lt;&gt;
      &lt;PiyingView schema={schema} options={options} modelChange={modelChange}&gt;&lt;/PiyingView&gt;
    &lt;/&gt;
  );
}
```
</custom-tab>
</custom-tabs>

## 查看

- 打开你的项目进行查看
