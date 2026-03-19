# 快速开始

## 模板实例

- 如果您有相关开发经验,可以先拉取相关模板查看源码

:1:custom-tabs{}
:2:custom-tab{label='Angular'}

```shell
https://github.com/piying-org/piying-view-angular-template
```

:2:
:2:custom-tab{label='Vue'}

```shell
https://github.com/piying-org/piying-view-vue-template
```

:2:
:2:custom-tab{label='React'}

```shell
https://github.com/piying-org/piying-view-react-template
```

:2:
:2:custom-tab{label='Svelte'}

```shell
https://github.com/piying-org/piying-view-svelte-template
```

:2:
:2:custom-tab{label='Solid'}

```shell
https://github.com/piying-org/piying-view-solid-template
```

:2:
:1:

## 安装

- 确保当前项目可以正常运行
- 安装以下依赖

:1:custom-tabs{}
:2:custom-tab{label='Angular'}

```shell
npm i @piying/view-angular
npm i valibot
```

:2:
:2:custom-tab{label='Vue'}

```shell
npm i @piying/view-vue
npm i valibot
```

:2:
:2:custom-tab{label='React'}

```shell
npm i @piying/view-react
npm i valibot
```

:2:
:2:custom-tab{label='Svelte'}

```shell
npm i @piying/view-svelte
npm i valibot
```

:2:
:2:custom-tab{label='Solid'}

```shell
npm i @piying/view-solid
npm i valibot
```

:2:
:1:

## 组件实现

### 普通组件

- 和正常开发时完全一样,在定义处配置input/output及其他属性传入

### 控件

- 皮影在所有库/框架上都实现了`ControlValueAccessor`,通过实现相关方法,使组件能够自动接入控件

:1:custom-tabs{}
:2:custom-tab{label='Angular'}

```typescript
import { Component, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControl } from '@piying/view-angular';
@Component({
  selector: 'app-input',
  imports: [FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFCC),
      multi: true,
    },
  ],
  template: `<input type="text" [ngModel]="value$()" (ngModelChange)="valueChange($event)" />`,
})
export class InputFCC extends BaseControl {}
```

:2:
:2:custom-tab{label='Vue'}

```vue
<script setup lang="ts">
import { useControlValueAccessor } from '@piying/view-vue';
import { vModelDynamic } from 'vue';
const {
  cva,
  cvaa: { value, disabled, valueChange, touchedChange },
} = useControlValueAccessor();
defineExpose({ cva });
</script>
<template>
  <input type="text" class="input" v-model-dynamic="value" :onUpdate:modelValue="valueChange" v-bind:disabled="disabled" @blur="touchedChange" />
</template>
<style></style>
```

:2:
:2:custom-tab{label='React'}

```tsx
import type { ControlValueAccessor } from '@piying/view-core';
import { CVA, useControlValueAccessor, useInputTextModel } from '@piying/view-react';
import { useImperativeHandle } from 'react';
interface PiInputOptions {
  [CVA]: React.RefObject<ControlValueAccessor>;
}
export function InputText(props: PiInputOptions) {
  const { cva, cvaa } = useControlValueAccessor();
  useImperativeHandle(props[CVA], () => cva, [cva]);
  const textModel = useInputTextModel(cvaa, false);
  return (
    <>
      <input type="text" className="input" {...textModel} />
    </>
  );
}
```

:2:
:2:custom-tab{label='Svelte'}

```svelte
<script lang='ts'>
  import { useControlValueAccessor } from '@piying/view-svelte';
  const { cva, cvaa } = useControlValueAccessor();
  export { cva };
</script>
<input
  class='input'
  type='text'
  bind:value={() => cvaa.value, (v) => cvaa.valueChange(v)}
  disabled={cvaa.disabled}
  onblur={cvaa.touchedChange}
/>
```

:2:
:2:custom-tab{label='Solid'}

```tsx
import type { ControlValueAccessor } from '@piying/view-core';
import { CVA, useControlValueAccessor, useInputTextModel } from '@piying/view-solid';
import { createMemo, type Setter } from 'solid-js';
interface PiInputOptions {
  [CVA]: Setter<ControlValueAccessor>;
}
export function InputText(props: PiInputOptions) {
  const result = useControlValueAccessor();
  createMemo(() => {
    props[CVA](result.cva);
  });
  const textModel = useInputTextModel(result.cvaa, () => false);
  return (
    <>
      <input type="text" class="input" {...textModel()} />
    </>
  );
}
```

:2:
:1:

### 包装器

- 实现`组件`的时候,只需要实现最核心的组件内容即可,不需要将验证/标签/提示内容一并实现
- 包装器可以让组件拥有额外能力
- 多个包装器可以通过排列组合使组件产生更多显示效果,并且减少代码耦合,易于维护

:1:custom-tabs{}
:2:custom-tab{label='Angular'}

```html
<div class="flex gap-2 items-center">
  @if (field$$().props()['title']; as title) {
  <span class="label">{{ title }}</span>
  }
  <ng-container insertField></ng-container>
</div>
```

```typescript
import { Component, computed } from '@angular/core';
import { InsertFieldDirective } from '@piying/view-angular';
import { setGlobalConfig, summarize } from 'valibot';
@Component({
  selector: 'label-wrapper',
  templateUrl: './component.html',
  imports: [InsertFieldDirective],
})
export class LabelWC {}
```

:2:
:2:custom-tab{label='Vue'}

```vue
<script setup lang='ts'>
import { PI_VIEW_FIELD_TOKEN, signalToRef } from '@piying/view-vue';
import { inject } from 'vue';
const field = inject(PI_VIEW_FIELD_TOKEN);
const props = signalToRef(() => field?.value.props());
</script>
<template>
  <div class='flex gap-2 items-center'>
    <span class='label' v-if='props['title']'>{{ props['title'] }}</span>
    <slot></slot>
  </div>
</template>
<style></style>
```

:2:
:2:custom-tab{label='React'}

```tsx
import { PI_VIEW_FIELD_TOKEN, useSignalToRef } from '@piying/view-react';
import { useContext } from 'react';
export function LabelWC(props: { children: any }) {
  const field = useContext(PI_VIEW_FIELD_TOKEN);
  const props2 = useSignalToRef(field, () => field?.props());
  return (
    <>
      <div className="flex gap-2 items-center">
        {props2?.['title'] ? <span className="label">{props2['title']}</span> : undefined}
        {props.children}
      </div>
    </>
  );
}
```

:2:
:2:custom-tab{label='Svelte'}

```svelte
<script lang='ts'>
  import { PI_VIEW_FIELD_TOKEN, signalToState } from '@piying/view-svelte';
  import { getContext } from 'svelte';
  let dProps: { children: any;  } = $props();
  const field = getContext<PI_VIEW_FIELD_TOKEN>(PI_VIEW_FIELD_TOKEN);
  const fProps = signalToState(() => field().props());
</script>
<div class='flex gap-2 items-center'>
  {#if fProps()!['title']}
    <span class='label' >{ fProps()!['title'] }</span>
  {/if}
  {@render dProps.children()}
</div>
```

:2:
:2:custom-tab{label='Solid'}

```tsx
import { PI_VIEW_FIELD_TOKEN, createSignalConvert } from '@piying/view-solid';
import clsx from 'clsx';
import { useContext, createMemo, Show } from 'solid-js';
export function LabelWrapper(props: { children: any }) {
  const field = useContext(PI_VIEW_FIELD_TOKEN)!;
  const props2 = createSignalConvert(() => {
    return field.props();
  });
  const attributes = createSignalConvert(() => field.attributes());
  const isRequired = createSignalConvert(() => !!field.form.control?.required$$());
  const wrapperClass = createMemo(() => {
    return clsx('flex gap-2', {
      'flex-col': props2()['labelPosition'] === 'top',
      'items-center': props2()['labelPosition'] !== 'top',
    });
  });
  const title = createMemo(() => props2()['title']);
  return (
    <>
      <div class={wrapperClass()}>
        <Show when={(!props2()['labelPosition'] || props2()['labelPosition'] === 'left' || props2()['labelPosition'] === 'top') && props2()['title']}>
          <label for={attributes()?.['id']}>
            <Show when={isRequired()}>
              <span class="text-red-500">*</span>
            </Show>
            <span class="label">{title()}</span>
          </label>
        </Show>
        {props.children}
        <Show when={props2()['labelPosition'] === 'right' && props2()['title']}>
          <label for={attributes()?.['id']}>
            <Show when={isRequired()}>
              <span class="text-red-500">*</span>
            </Show>
            <span class="label">{title()}</span>
          </label>
        </Show>
      </div>
    </>
  );
}
```

:2:
:1:

### 分组

- 当需要调整多个组件的布局,样式及相关显示时,就需要分组
  > `object`/`intersect`/`union`/`tuple`/`array`类型时可使用
- 所有库/框架都实现了最基础的`PiyingViewGroup`,但这个并没有任何样式,排版,所以往往需要按要求自定义

:1:custom-tabs{}
:2:custom-tab{label='Angular'}

```html
<fieldset class="fieldset bg-base-200 border-base-300 rounded-box border p-4 w-full">
  @if (field().props()['title']; as title) {
  <legend class="fieldset-legend">{{ title }}</legend>
  } @for (field of fields(); track field.id || $index) {
  <ng-container *ngTemplateOutlet="fieldTemplateRef(); context: { $implicit: field }"></ng-container>
  }
</fieldset>
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

:2:
:2:custom-tab{label='Vue'}

```vue
<script setup lang='ts'>
import type { PiResolvedViewFieldConfig } from '@piying/view-vue';
import { PI_VIEW_FIELD_TOKEN, PiyingFieldTemplate, signalToRef } from '@piying/view-vue';
import { inject } from 'vue';
const dInputs = defineProps<{
  fields: PiResolvedViewFieldConfig[];
}>();
const field = inject(PI_VIEW_FIELD_TOKEN);
const props = signalToRef(() => field?.value.props());
</script>
<template>
  <fieldset class='fieldset bg-base-200 border-base-300 rounded-box border p-4 w-full'>
    <legend class='fieldset-legend' v-if='props['title']'>{{ props['title'] }}</legend>
    <template v-for='(field, index) in dInputs.fields' :key='index'>
      <piying-field-template :field='field!'></piying-field-template>
    </template>
  </fieldset>
</template>
<style></style>
```

:2:
:2:custom-tab{label='React'}

```tsx
import { PI_VIEW_FIELD_TOKEN, useSignalToRef, type PiResolvedViewFieldConfig, PiyingFieldTemplate } from '@piying/view-react';
import { useContext } from 'react';
export function FieldsetFGC(props: { fields: PiResolvedViewFieldConfig[] }) {
  const field = useContext(PI_VIEW_FIELD_TOKEN);
  const props2 = useSignalToRef(field, (field) => field?.props());
  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 w-full">
      {props2?.['title'] ? <legend className="fieldset-legend">{props2['title']}</legend> : undefined}
      {props.fields.map((field, index) => {
        return <PiyingFieldTemplate field={field} key={index}></PiyingFieldTemplate>;
      })}
    </fieldset>
  );
}
```

:2:
:2:custom-tab{label='Svelte'}

```svelte
<script lang='ts'>
  import { PI_VIEW_FIELD_TOKEN, PiyingFieldTemplate, signalToState } from '@piying/view-svelte';
  import { getContext } from 'svelte';
  const field = getContext<PI_VIEW_FIELD_TOKEN>(PI_VIEW_FIELD_TOKEN);
  const props = signalToState(() => field().props())!;
  const children = signalToState(() => field().children!())!;
</script>
<fieldset class='fieldset bg-base-200 border-base-300 rounded-box border p-4 w-full'>
  {#if props()!['title']}
    <legend class='fieldset-legend'>{props()!['title']}</legend>
  {/if}
  {#each children()! as field, i (i)}
    <PiyingFieldTemplate {field}></PiyingFieldTemplate>
  {/each}
</fieldset>
```

:2:
:2:custom-tab{label='Solid'}

```tsx
import { PI_VIEW_FIELD_TOKEN, createSignalConvert, PiyingFieldTemplate } from '@piying/view-solid';
import { For, Show, useContext } from 'solid-js';
export function FieldsetGroup(_: {}) {
  const field = useContext(PI_VIEW_FIELD_TOKEN);
  const props2 = createSignalConvert(() => field?.props());
  const children = createSignalConvert(() => field?.children!())!;
  return (
    <>
      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box border p-4 w-full">
        <Show when={props2()?.['title']} keyed>
          {(title) => <legend class="fieldset-legend">{title}</legend>}
        </Show>
        <For each={children()}>
          {(field) => {
            return <PiyingFieldTemplate field={field}></PiyingFieldTemplate>;
          }}
        </For>
      </fieldset>
    </>
  );
}
```

:2:
:1:

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

:1:custom-tabs{}
:2:custom-tab{label='Angular'}

```html
<piying-view [schema]="schema" [options]="options" (modelChange)="modelChagned($event)"></piying-view>
```

```typescript
import { Component, OnInit } from '@angular/core';
import { actions, setComponent } from '@piying/view-angular-core';
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
      text1: v.pipe(v.optional(v.string()), v.title('text1-label'), actions.wrappers.set(['label'])),
    }),
    v.title('form'),
    setComponent('fieldset'),
  );
  options = {
    fieldGlobalConfig: FieldGlobalConfig,
  };
  modelChagned(event: any) {
    console.log(event);
  }
}
```

:2:
:2:custom-tab{label='Vue'}

```vue
<script setup lang="ts">
import { PiyingView } from '@piying/view-vue';
import { actions, setComponent } from '@piying/view-core';
import * as v from 'valibot';
import { ref } from 'vue';
const schema = v.pipe(
  v.object({
    text1: v.pipe(v.optional(v.string()), v.title('text1-label'), actions.wrappers.set(['label'])),
  }),
  v.title('form'),
  setComponent('fieldset'),
);
const options = {
  fieldGlobalConfig: FieldGlobalConfig,
};
function modelChange(event: any) {
  console.log(event);
}
const model = ref({});
</script>
<template>
  <piying-view :schema="schema" :options="options" :model-value="model" @update:model-value="modelChange"></piying-view>
</template>
```

:2:
:2:custom-tab{label='React'}

```tsx
import * as v from 'valibot';
import { setComponent, actions } from '@piying/view-core';
import { PiyingView } from '@piying/view-react';
const schema = v.pipe(
  v.object({
    text1: v.pipe(v.optional(v.string()), v.title('text1-label'), actions.wrappers.set(['label'])),
  }),
  v.title('form'),
  setComponent('fieldset'),
);
const options = {
  fieldGlobalConfig: FieldGlobalConfig,
};
export function PiyingPage() {
  function modelChange(event: any) {
    console.log(event);
  }
  return <PiyingView schema={schema} options={options} modelChange={modelChange}></PiyingView>;
}
```

:2:
:2:custom-tab{label='Svelte'}

```svelte
<script lang='ts'>
  import { PiyingView } from '@piying/view-svelte';
  import { setComponent, actions } from '@piying/view-core';
  import * as v from 'valibot';
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
  function modelChange(event: any) {
    console.log(event);
  }
  const model = $state({});
</script>
<PiyingView {schema} {options} {model} {modelChange}></PiyingView>
```

:2:
:2:custom-tab{label='Solid'}

```tsx
import * as v from 'valibot';
import { setComponent, actions } from '@piying/view-core';
import { PiyingView } from '@piying/view-solid';
const schema = v.pipe(
  v.object({
    text1: v.pipe(v.optional(v.string()), v.title('text1-label'), actions.wrappers.set(['label'])),
  }),
  v.title('form'),
  setComponent('fieldset'),
);
const options = {
  fieldGlobalConfig: FieldGlobalConfig,
};
export function PiyingPage() {
  function modelChange(event: any) {
    console.log(event);
  }
  return (
    <>
      <PiyingView schema={schema} options={options} modelChange={modelChange}></PiyingView>
    </>
  );
}
```

:2:
:1:

## 查看

- 打开你的项目进行查看
