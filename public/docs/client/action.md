# Action

- [概念](docs/client/concept/action)

---

## rawConfig

- 几乎所有皮影 Action 的基础
- 接收 `SchemaHandle` 参数，允许直接访问和修改 field 配置
- 用于自定义 Action 封装

```ts
v.pipe(
  v.string(),
  rawConfig((item) => {
    item.inputs = { ...item.inputs, type: 'date' };
    return item;
  }),
);
```

## setComponent

- 使用 `v.string()` 时自动查找注册的 `string` 配置
- 也可手动指定组件类型
  > 如果组件仅使用一次时可直接指定，否则推荐先注册再使用

```ts
v.pipe(v.string(), setComponent('textarea'));
```

---

## formConfig

用于调整`表单控件`的行为：

| 参数              | 说明                                             |
| ----------------- | ------------------------------------------------ |
| `disabled`        | 是否禁用                                         |
| `disabledValue`   | 禁用时值是否删除（默认删除）                     |
| `transformer`     | 输入/输出值时进行转换                            |
| `pipe`            | 输出值时的防抖处理（rxjs pipe）                  |
| `validators`      | 表单验证（推荐使用 `v.check`）                   |
| `asyncValidators` | 异步表单验证                                     |
| `updateOn`        | 输出值时机（change/blur/submit）                 |
| `emptyValue`      | 空值时的默认返回值（仅 array/group/logic group） |
| `deletionMode`    | array 子项删除时的处理方式（undefined/跳过）     |

- 基础禁用配置

```ts
v.pipe(v.string(), formConfig({ disabled: true }));
```

- 输入输出转换

```ts
v.pipe(
  v.string(),
  formConfig({
    transformer: {
      toView(value, control) {
        return `1${value ?? ''}`;
      },
      toModel(value, control) {
        return (value ?? '').slice(1);
      },
    },
  }),
  actions.hooks.merge({
    allFieldsResolved: (field) => {
      field.form.control.valueChanges.subscribe((value) => {
        console.log(value);
      });
    },
  }),
);
```

- 更新时机配置

```ts
v.pipe(v.string(), formConfig({ updateOn: 'blur' }));
```

## renderConfig

| 参数     | 说明             |
| -------- | ---------------- |
| `hidden` | 控制组件是否隐藏 |

```ts
v.object({
  k1: v.pipe(v.optional(v.string(), 'k2  hidden'), renderConfig({ hidden: true })),
  k2: v.pipe(v.string(), renderConfig({ hidden: false })),
});
```

---

## disableWhen

控制`控件`何时禁用

```ts
v.object({
  enable: v.pipe(v.boolean()),
  value: v.pipe(
    v.string(),
    disableWhen({
      listen: (fn, field) =>
        fn({
          list: [['..', 'enable']],
        }).pipe(map((item) => !item.list[0])),
    }),
  ),
});
```

## hideWhen

控制`组件`何时隐藏

| 参数       | 说明                                |
| ---------- | ----------------------------------- |
| `disabled` | 隐藏时是否同时禁用控件（默认 true） |
| `listen`   | 监听其他控件的值变化                |

```ts
v.object({
  enable: v.pipe(v.boolean()),
  value: v.pipe(
    v.string(),
    hideWhen({
      disabled: true,
      listen: (fn, field) =>
        fn({
          list: [['..', 'enable']],
        }).pipe(map((item) => !item.list[0])),
    }),
  ),
});
```

---

## valueChange

监听`控件`的值变更，支持多控件监听

```ts
v.pipe(
  v.string(),
  valueChange((listen) => {
    listen({ list: [undefined] }).subscribe((value) => {
      console.log('value change', value);
    });
  }),
);
```

- 多字段监听

```ts
v.object({
  enable: v.pipe(v.boolean()),
  value: v.pipe(
    v.string(),
    valueChange((listen) =>
      listen({ list: [undefined, ['..', 'enable']] }).subscribe((value) => {
        console.log('value list', value.list);
        console.log('field', value.field);
        console.log('listenFields', value.listenFields);
      }),
    ),
  ),
});
```

## outputChange

```typescript
outputChange((fn) => {
  fn([
    { list: undefined, output: 'output1' },
    { list: ['..', 'k1'], output: 'output2' },
  ]).subscribe((value) => {});
});
```

---

## 属性操作

通用格式：`actions.[propertyName].[method]`

### 通用属性

- `inputs` / `outputs` / `attributes` / `events` / `props` / `wrappers`

### 方法说明

| 方法         | 说明                                    |
| ------------ | --------------------------------------- |
| `set`        | 替换当前输入设置                        |
| `patch`      | 与已有配置合并（覆盖已有）              |
| `remove`     | 删除一项/多项                           |
| `patchAsync` | `patch` 的异步版本，支持 field 和上下文 |
| `merge`      | 用于 `outputs`/`events`，允许多个监听   |
| `mergeAsync` | `merge` 的异步版本                      |
| `mapAsync`   | 对所有属性进行处理                      |

### 使用示例

- 覆盖前面的设置

```ts
v.pipe(NFCSchema, setComponent('button'), actions.attributes.set({ id: 'id1', 'data-k1': '1' }), actions.attributes.set({ id: 'id2' }));
```

- 覆盖已存在的值

```ts
v.pipe(NFCSchema, setComponent('button'), actions.attributes.patch({ id: 'id1', 'data-k1': '1' }), actions.attributes.patch({ id: 'id2' }));
```

- 异步设置（支持 Promise/Signal/Observable）

```ts
v.pipe(NFCSchema, setComponent('button'), actions.inputs.patchAsync({ content: () => '1' }));
```

```ts
v.pipe(
  NFCSchema,
  setComponent('button'),
  actions.inputs.patchAsync({
    content: () => {
      let ob = new BehaviorSubject(0);
      let id = setInterval(() => {
        ob.next(ob.value + 1);
        if (ob.value === 10) {
          clearInterval(id);
        }
      }, 500);
      return ob;
    },
  }),
);
```

- 动态数据映射

```ts
v.pipe(
  NFCSchema,
  setComponent('button'),
  actions.props.patch({ value: '1' }),
  actions.inputs.mapAsync((field) => {
    return (value) => ({
      ...value,
      content: field.props()['value'],
    });
  }),
);
```

### actions.class

### top

- 在当前定义的顶层增加类(顶级的wrapper或组件)

```ts
v.pipe(v.string(), actions.wrappers.set(['block']), actions.class.top('testa'));
```

- 默认为替换当前类,也可以设置`true`合并已有类

```ts
v.pipe(v.string(), actions.wrappers.set(['block']), actions.class.top('testa'), actions.class.top('testb', true));
```

### bottom(component)

- 设置组件自身的类,与`top`类似

```ts
v.pipe(v.string(), actions.wrappers.set(['block']), actions.class.bottom('testa'));
```

## providers

提供者配置，用于在字段的 injector 中添加服务

### providers.set

- 设置提供者（会覆盖所有已有的提供者）

```typescript
v.pipe(v.string(), actions.providers.set([Test1Service]));
```

### providers.patch

- 添加提供者

```typescript
v.pipe(v.string(), actions.providers.patch([{ provide: Test1Token, useValue: 123 }]));
```

### providers.change

- 动态修改提供者列表

```typescript
v.pipe(
  v.string(),
  actions.providers.change((providers) => [...providers, newService]),
);
```

## layout

- 移动组件到指定的位置
- `priority`表示优先级,数字越小,位置越靠前

```ts
v.object({
  __btn1: v.pipe(
    NFCSchema,
    setComponent('button'),
    actions.inputs.patch({
      content: 'btn1',
    }),
  ),
  __btn2: v.pipe(
    NFCSchema,
    setComponent('button'),
    layout({ priority: -1 }),
    actions.inputs.patch({
      content: 'btn2',
    }),
  ),
});
```

- `btn1`被提升到根级

```ts
v.object({
  l1: v.pipe(
    v.object({
      __btn1: v.pipe(
        NFCSchema,
        setComponent('button'),
        actions.inputs.patch({
          content: 'btn1',
        }),
        layout({ keyPath: ['#'] }),
      ),
    }),
    v.title('l1-label'),
    actions.wrappers.patch(['label']),
  ),

  __btn2: v.pipe(
    NFCSchema,
    setComponent('button'),
    actions.inputs.patch({
      content: 'btn2',
    }),
  ),
});
```

```typescript
layout({ keyPath: ['#'], priority: -2 });
```

## asVirtualGroup

- 使用`intersect`时,会自动创建一个`LogicGroup`;使用后设置为普通 group 表单，用于更好的页面布局

- 设置前

```ts
v.pipe(
  v.intersect([
    v.string(),
    v.string(),
    v.pipe(
      NFCSchema,
      setComponent('button'),
      actions.inputs.patch({
        content: 'test',
      }),
      actions.inputs.patchAsync({
        clicked: (field) => {
          return () => {
            console.log(field.form.parent);
          };
        },
      }),
    ),
  ]),
);
```

- 设置后

```ts
v.pipe(
  v.intersect([
    v.string(),
    v.string(),
    v.pipe(
      NFCSchema,
      setComponent('button'),
      actions.inputs.patch({
        content: 'test',
      }),
      actions.inputs.patchAsync({
        clicked: (field) => {
          return () => {
            console.log(field.form.parent);
          };
        },
      }),
    ),
  ]),
  asVirtualGroup(),
);
```

## asControl

- 使用`v.array(v.string())`时,如果不想表示为`FieldArray`,而是仅仅想视为一个普通的类型`FieldControl`时使用;可能需要配合`setComponent`
- 将定义设置为表单控件，通常用于对象/数组类型(v.array(),v.group())但视为普通控件

```ts
v.object({
  o1: v.pipe(
    v.object({
      k1: v.string(),
    }),
  ),
  o2: v.pipe(
    v.object({
      k2: v.string(),
    }),
    setComponent('textarea'),
    asControl(),
  ),
  __btn1: v.pipe(
    NFCSchema,
    setComponent('button'),
    actions.inputs.patch({
      content: 'test',
    }),
    actions.inputs.patchAsync({
      clicked: (field) => {
        return () => {
          console.log(field.form.parent.children$$());
        };
      },
    }),
  ),
});
```

## nonFieldControl

设置表单控件不关联 formControl，也就是该控件被设置为一个普通的组件

```ts
v.object({
  key1: v.pipe(v.string(), nonFieldControl()),
});
```

## setAlias

- 设置别名,方便查询

```ts
v.object({
  value1: v.pipe(v.string(), setAlias('value1')),
  __btn: v.pipe(
    NFCSchema,
    setComponent('button'),
    actions.inputs.patchAsync({
      clicked: (field) => {
        return () => {
          console.log(field.get(['@value1']));
        };
      },
    }),
  ),
});
```

## condition

- 条件控制，根据环境或条件执行不同的 actions
- 需要在组件的options中配置`environments`

```ts
v.object({
  key1: v.pipe(
    v.string(),
    condition({
      environments: ['default'],
      actions: [
        rawConfig((item) => {
          item.inputs = { ...item.inputs, type: 'date' };
          return item;
        }),
      ],
    }),
  ),
});
```
