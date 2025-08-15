# 组件使用

- 如果您需要实现某种逻辑却没有头绪,欢迎[提问](https://github.com/piying-org/piying-view/issues)

## 创建多个组件

- 默认提供了一个基础的object组件,用来展示内部子组件

```ts
v.object({
  k1: v.string(),
  k2: v.number(),
});
```

- 您也可以自定义object组件,修改显示方式

```ts
v.pipe(
  v.object({
    k1: v.string(),
    k2: v.number(),
  }),
  setComponent("fieldset"),
);
```

- 增加包装器

```ts
v.pipe(
  v.object({
    k1: v.pipe(v.string(), v.title("k1-label"), setWrappers(["label"])),
    k2: v.pipe(v.number(), v.title("k2-label"), v.minValue(10), setWrappers(["label", "validator"])),
  }),
  setComponent("fieldset"),
);
```

## 非表单控件组件

默认情况下,由于valibot为强类型定义,所以所有输入默认为表单控件,如果想要定义为非表单控件,可以使用`v.optional(v.void())`,表示一个不可能的值

使用此声明后,一定要使用`setComponent`手动指定一个确定的组件名

```ts
v.object({
  __k1: v.pipe(NFCSchema, setComponent("string")),
  __k2: v.pipe(v.optional(v.void()), setComponent("string")),
});
```

- `NFCSchema`: `NonFieldControlSchema`

## 设置输入属性

- 静态属性

```ts
v.pipe(v.string(), setInputs({ input1: 1 }));
```

- 动态变更,支持Promise,Observable,Signal

```ts
v.pipe(
  v.string(),
  patchAsyncInputs({
    input1: async (field) => {
      return 1;
    },
  }),
);
```

## 事件输出

- 事件输出允许同时监听多个组件,多个输出,然后根据其输出逻辑关系处理

```ts
v.pipe(
  v.string(),
  outputChange((fn) => {
    fn([{ list: undefined, output: "output1" }]).subscribe(({ field, list, listenFields }) => {});
  }),
);
```

## 上下文

- 通过传入`context`使得组件可以通过上下文动态获取参数

```ts
{
  context: { lastValue$: new BehaviorSubject(undefined) },
  schema: v.object({
    input1: v.pipe(
      v.string(),
      valueChange((fn) => {
        fn({ list: [undefined] }).subscribe(({ list, field }) => {
          console.log('prev:', field.context.lastValue$.value);

          field.context.lastValue$.next(list[0]);
        });
      }),
    ),
  }),
}
```

## 高级自定义

- 所有的设置操作,都是基于`rawConfig`封装,该方法允许修改很多底层设置,方便开发者自行定义

```ts
v.pipe(
  v.string(),
  rawConfig((field) => {}),
);
```
