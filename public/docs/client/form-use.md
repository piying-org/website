# 表单使用

- 如果您需要实现某种逻辑却没有头绪,欢迎[提问](https://github.com/piying-org/piying-view/issues)

## 类型映射

- 大部分`Valibot`类型会被解析为`表单控件`类型
- 以下为一些常用的类型

  > 更多类型请到[valibot](https://valibot.dev/api/)中查看.如果需要自定义类型请使用[custom](https://valibot.dev/api/custom/)

- `string`

```ts
v.string();
```

- `number`

```ts
v.number();
```

- `boolean`

```ts
v.boolean();
```

- `picklist`

```ts
v.picklist(["v1", "v2", "v3"]);
```

---

- 以下类型会被解析为`表单组`
- `object`/`strictObject` 自动过滤未定义的键值

```ts
{
  model: { k1: 'v1', k2: 2, k3: 'v3' },
  schema: v.object({
    k1: v.string(),
    k2: v.number(),
    __helper: v.pipe(NFCSchema, setComponent('formHelper')),
  }),
}
```

- `looseObject` 会保留未定义的键值

```ts
{
  model: { k1: 'v1', k2: 2, k3: 'v3' },
  schema: v.looseObject({
    k1: v.string(),
    k2: v.number(),
    __helper: v.pipe(NFCSchema, setComponent('formHelper')),
  }),
}
```

- `objectWithRest` 部分固定键值,部分可添加键值

```ts
{
  model: { k1: 'v1', k2: 2, k3: 'v3' },
  schema: v.intersect([
    v.objectWithRest(
      {
        k1: v.string(),
        k2: v.number(),
      },
      v.string(),
    ),
    v.optional(
      v.object({
        __helper: v.pipe(NFCSchema, setComponent('formHelper')),
      }),
    ),
  ]),
}
```

- `record` 无固定键值,全部为可添加键值
  > 目前仅支持key为string类型

```ts
{
  model: { o1: { k1: 'v1' } },
  schema: v.intersect([
    v.object({
      o1: v.record(v.string(), v.string()),
    }),
    v.optional(
      v.object({
        __helper: v.pipe(NFCSchema, setComponent('formHelper')),
      }),
    ),
  ]),
}
```

---

- 以下类型会被解析为`表单数组`

- `tuple`/`strictTuple` 固定的数组项,不可添加,超过长度自动过滤

```ts
{
  model: { list: ['v1'] },
  schema: v.intersect([
    v.object({
      list: v.tuple([v.string()]),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ]),
}
```

- `looseTuple` 固定的数组项,不可添加,超过长度保留

```ts
{
  model: { list: ['v1','v2'] },
  schema: v.intersect([
    v.object({
      list: v.looseTuple([v.string()]),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ]),
}
```

- `tupleWithRest` 部分固定,部分可添加

```ts
{
  model: { list: ['v1', 'v2'] },
  schema: v.intersect([
    v.object({
      list: v.tupleWithRest([v.string()], v.string()),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ]),
}
```

- `array` 动态添加子项

```ts
{
  model: { list: ['v1'] },
  schema: v.intersect([
    v.object({
      list: v.array(v.string()),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ]),
}
```

## 默认值

```ts
v.object({
  k1: v.optional(v.string(), "default value"),
});
```

## 值变更监听

- `list`属性接受一个路径或者undefined,通过路径查询到对应控件并监听输入值变更

```ts
v.object({
  k1: v.pipe(
    v.string(),
    valueChange((fn) => {
      fn({ list: [undefined] }).subscribe(({ list }) => {
        console.log(list[0]);
      });
    }),
  ),
});
```

## 输出转换

```ts
v.object({
  k1: v.pipe(
    v.string(),
    v.transform((value) => `output: ${value}`),
    valueChange((fn) => {
      fn({ list: [undefined] }).subscribe(({ list }) => {
        console.log(list[0]);
      });
    }),
  ),
});
```

## 布局移动

- 此功能在组件中也可以使用,由于组件中不需要考虑类型,所以很容易进行各种排版;但是表单中往往是数据结构与视图布局不一致,这时候就需要在保证数据结构正常的前提下,移动组件
- 需要注意的是,被移动的位置一定要先被解析
- 权重越大,组件越靠后

```ts
v.pipe(
  v.intersect([
    v.pipe(v.object({}), setComponent("fieldset"), setAlias("ly1")),
    v.pipe(v.object({}), setComponent("fieldset"), setAlias("ly2")),
    v.object({
      input1: v.pipe(v.string(), layout({ keyPath: ["@ly1"] }), v.title("input1")),
      input2: v.pipe(v.string(), layout({ keyPath: ["@ly2"], priority: 3 }), v.title("input2")),
      input3: v.pipe(v.string(), layout({ keyPath: ["@ly2"], priority: 2 }), v.title("input3")),
      input4: v.pipe(v.string(), layout({ keyPath: ["@ly2"], priority: 1 }), v.title("input4")),
      __helper: v.pipe(NFCSchema, setComponent("formHelper")),
    }),
  ]),
  asVirtualGroup(),
);
```

## 分区禁用

当表单部分字段在某些场景可以/不可以被填写时使用

```ts
v.object({
  enable: v.pipe(v.boolean()),
  value: v.intersect([
    v.pipe(
      v.object({
        input1: v.string(),
        input2: v.string(),
      }),
      disableWhen({
        listen: (fn) => {
          return fn({ list: [["#", "enable"]] }).pipe(
            map(({ list }) => {
              return list[0];
            }),
          );
        },
      }),
    ),
    v.pipe(
      v.object({
        input3: v.string(),
        input4: v.string(),
      }),
      disableWhen({
        listen: (fn) => {
          return fn({ list: [["#", "enable"]] }).pipe(
            map(({ list }) => {
              return !list[0];
            }),
          );
        },
      }),
    ),
  ]),
});
```

## 数组

- 任何情况下,您都可以将指定类型定义外加入`v.array()`,表明为一个数组

```ts
v.object({
  list: v.pipe(v.array(v.string()), setComponent("array-rw"), actions.inputs.set({  minLength: 2 })),
});
```

## 嵌套定义

- 使用object可以进行多级数据结构定义

```ts
v.pipe(
  v.object({
    k1: v.pipe(v.string(), v.title("一级k1"), actions.wrappers.set(["label"])),
    o1: v.pipe(
      v.object({
        k2: v.pipe(v.optional(v.string()), v.title("二级k2"), actions.wrappers.set(["label"])),
        k3: v.pipe(v.optional(v.string()), v.title("二级k3"), actions.wrappers.set(["label"])),
      }),
      setComponent("fieldset"),
      v.title("一级o1"),
    ),
  }),
  setComponent("fieldset"),
  valueChange((fn) => {
    fn().subscribe(({ list }) => {
      console.log(list[0]);
    });
  }),
);
```

## 字段分组

- `v.intersect()`+`asVirtualGroup`可以进行多级虚拟组

```ts
v.pipe(
  v.intersect([
    v.pipe(
      v.object({
        k1: v.optional(v.string()),
        k2: v.optional(v.string()),
      }),
      setComponent("fieldset"),
      v.title("tab1-fieldset"),
    ),
    v.pipe(
      v.object({
        k3: v.optional(v.string()),
        k4: v.optional(v.string()),
      }),
      v.title("tab2"),
    ),
  ]),
  setComponent("tabs"),
  asVirtualGroup(),
  valueChange((fn) => {
    fn().subscribe(({ list }) => {
      console.log("tabs", list[0]);
    });
  }),
);
```

## 值变更时修改表单其他值

- 使用`valueChange`监听控件并进行变更

```ts
v.object({
  list: v.pipe(
    v.picklist(["data1", "data2"]),
    valueChange((fn) => {
      fn().subscribe(({ list: [value], field }) => {
        let o1FG = field.get(["#", "o1"]).form.control;
        let o2FG = field.get(["#", "o2"]).form.control;
        if (value === "data1") {
          o1FG.updateValue({
            k1: "data1-input-k1",
            k2: "data1-input-k2",
          });
          o2FG.updateValue({});
        } else {
          o2FG.updateValue({
            k3: "data2-input-k3",
            k4: "data2-input-k4",
          });
          o1FG.updateValue({});
        }
      });
    }),
  ),
  o1: v.object({ k1: v.optional(v.string()), k2: v.optional(v.string()) }),
  o2: v.object({ k3: v.optional(v.string()), k4: v.optional(v.string()) }),
});
```

## 验证

- 验证和控件组件完全解偶,需要自行实现,只提供相关控件状态
- 可以使用`wrapper`套一层实现

```ts
v.pipe(
  v.object({
    k1: v.pipe(
      v.string(),
      v.check((value) => {
        return value === "k2-value";
      }, "should input k2-value"),
      actions.wrappers.set(["validator"]),
    ),
  }),
);
```

- 也可以使用group只在专门的组中进行验证

```ts
v.pipe(
  v.object({
    k1: v.string(),
    k2: v.pipe(
      v.string(),
      v.check((value) => {
        return value === "k2-value";
      }),
    ),
  }),
  setComponent("validGroup"),
);
```

## 级联

- 通过`valueChange`监听指定控件,更新控件值
- 第一次监听的值默认为undefined(假如没有设置默认值),所以需要跳过

```ts
v.object({
  k1: v.boolean(),
  k2: v.pipe(
    v.boolean(),
    valueChange((fn) => {
      fn({ list: [["#", "k1"]] })
        .pipe(skip(1))
        .subscribe(({ list: [value], field }) => {
          field.form.control?.updateValue(!value);
        });
    }),
  ),
  k3: v.pipe(
    v.boolean(),
    valueChange((fn) => {
      fn({ list: [["#", "k2"]] })
        .pipe(skip(1))
        .subscribe(({ list: [value], field }) => {
          field.form.control?.updateValue(!value);
        });
    }),
  ),
  k4: v.pipe(
    v.boolean(),
    valueChange((fn) => {
      fn({ list: [["#", "k3"]] })
        .pipe(skip(1))
        .subscribe(({ list: [value], field }) => {
          field.form.control?.updateValue(!value);
        });
    }),
  ),
});
```

## 过滤组

- 自定义创建表单组控制内部表单的显示

```ts
v.pipe(
  v.object(
    new Array(100)
      .fill(undefined)
      .map((item, i) => v.pipe(v.string(), v.title(`SearchTitle${i}`)))
      .reduce((obj, item, i) => {
        obj[`k${i}`] = item;
        return obj;
      }, Object.create({})),
  ),
  setComponent("filterGroup"),
);
```

## 滚动组

- 使用`defer`动态创建控件

```ts
v.pipe(
  v.object(
    new Array(100)
      .fill(undefined)
      .map((item, i) => v.pipe(v.string(), v.title(`title${i}`)))
      .reduce((obj, item, i) => {
        obj[`k${i}`] = item;
        return obj;
      }, Object.create({})),
  ),
  setComponent("scrollGroup"),
  actions.inputs.set({ scrollHeight: 500, placeholerHeight: 20 }),
);
```
