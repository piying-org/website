# 组件使用

- 如果您需要实现某种逻辑,欢迎[提问](https://github.com/piying-org/piying-view/issues)

## 组件类型

| 类型     | 说明                                 |
| -------- | ------------------------------------ |
| 普通组件 | 没有实现 ControlValueAccessor 的组件 |
| 控件控件 | 实现 ControlValueAccessor 的表单控件 |
| 普通分组 | 可包含子组件的容器组件               |
| 逻辑分组 | anyOf/oneOf 等逻辑组合               |

---

## 基础使用

### 无标签组件(Angular selectorless)

- 使用指定的语法可以实现无自定义选择器

```typescript
import { Component, viewChild } from '@angular/core';

@Component({
  selector: 'selectorless-nfcc',
  template: `<ng-template #templateRef>
    <div>not parent tag1</div>
    <div>not parent tag2</div>
  </ng-template> `,
  standalone: true,
})
export class SelectorlessNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
}
```

```ts
v.pipe(NFCSchema, setComponent('selectorless-demo'), actions.wrappers.set(['label']), v.title('selectorless'));
```

### 创建多个组件

- 默认提供基础的 object 组件，用来展示内部子组件

```ts
v.object({
  k1: v.string(),
  k2: v.number(),
});
```

- 也可自定义 object 组件，修改显示方式

```ts
v.pipe(
  v.object({
    k1: v.string(),
    k2: v.number(),
  }),
  setComponent('fieldset'),
);
```

- 可增加包装器，添加标签和验证等附加功能

```ts
v.pipe(
  v.object({
    k1: v.pipe(v.string(), v.title('k1-label'), actions.wrappers.set(['label'])),
    k2: v.pipe(v.number(), v.title('k2-label'), v.minValue(10), actions.wrappers.set(['label', 'validator'])),
  }),
  setComponent('fieldset'),
);
```

### 非表单控件组件

- 默认情况下，Valibot 的强类型定义使所有输入默认为表单控件
- 若需定义为非表单控件，可使用 NFCSchema(`v.optional(v.void())`)
- 使用后必须使用 `setComponent` 手动指定组件名

```ts
v.object({
  __k1: v.pipe(NFCSchema, setComponent('string')),
  __k2: v.pipe(v.optional(v.void()), setComponent('string')),
});
```

> `NFCSchema`：`NonFieldControlSchema`，用于定义非表单控件

---

## 属性操作

### 设置输入属性

#### 静态属性

```ts
v.pipe(NFCSchema, setComponent('demo'), actions.inputs.set({ input1: 1 }));
```

#### 动态变更（支持 Promise/Observable/Signal）

```ts
v.pipe(
  NFCSchema,
  setComponent('demo'),
  actions.inputs.patchAsync({
    input1: async (field) => {
      return 1;
    },
  }),
);
```

### 事件输出

- 事件输出允许同时监听多个组件、多个输出，然后根据其输出逻辑关系处理

```ts
v.pipe(
  NFCSchema,
  setComponent('demo'),
  outputChange((fn) => {
    fn([{ list: undefined, output: 'output1' }]).subscribe(({ field, list, listenFields }) => {});
  }),
);
```

---

## 上下文

- 通过传入 `context` 使得组件可以通过上下文动态获取参数

```ts
{
  context: { lastValue$: new BehaviorSubject(undefined) },
  schema: v.object({
    input1: v.pipe(
      v.string(),
      valueChange((fn) => {
        fn({ list: [undefined] }).subscribe(({ list, field }) => {
          console.log("prev:", field.context.lastValue$.value);
          field.context.lastValue$.next(list[0]);
        });
      }),
    ),
  }),
}
```

---

## 高级自定义

- 所有设置操作都基于 `rawConfig` 封装
- `rawConfig` 允许修改底层设置，方便开发者自行定义

```ts
v.pipe(
  v.string(),
  rawConfig((field) => {
    // 可进行底层配置
  }),
);
```
