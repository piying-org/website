# api

## action

### component

- 设置组件类型

```ts
v.pipe(v.string(), setComponent('textarea'));
```

### actions通用方法

- inputs/outputs/attributes/events均含有以下方法,可以进行设置

#### set

- 设置属性,会覆盖所有值

```ts
v.pipe(NFCSchema, setComponent('button'), actions.attributes.set({ id: 'id1', 'data-k1': '1' }), actions.attributes.set({ id: 'id2' }));
```

#### patch

- 设置属性,会覆盖已存在的值

```ts
v.pipe(NFCSchema, setComponent('button'), actions.attributes.patch({ id: 'id1', 'data-k1': '1' }), actions.attributes.patch({ id: 'id2' }));
```

#### patchAsync

- 设置属性,会覆盖所有值

```ts
v.pipe(NFCSchema, setComponent('button'), actions.attributes.set({ id: 'id1', 'data-k1': '1' }), actions.attributes.set({ id: 'id2' }));
```

#### patch

- 设置属性,会覆盖已存在的值

```ts
v.pipe(NFCSchema, setComponent('button'), actions.attributes.patch({ id: 'id1', 'data-k1': '1' }), actions.attributes.patch({ id: 'id2' }));
```

#### patchAsync

- 设置属性,允许使用field,并返回一个异步的值(Promise,Signal,Observable)动态更新

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

#### mapAsync

- 允许进行动态数据转换

```ts
v.pipe(
  NFCSchema,
  setComponent('button'),
  actions.props.patch({
    value: '1',
  }),
  actions.inputs.mapAsync((field) => {
    return (value) => {
      return {
        ...value,
        content: field.props()['value'],
      };
    };
  }),
);
```

### class

- 在当前定义的顶层增加类

```ts
v.pipe(v.string(), actions.wrappers.set(['block']), actions.class.top('testa'));
```

- 在当前定义的内层增加类(也就是当前组件)

```ts
v.pipe(v.string(), actions.wrappers.set(['block']), actions.class.bottom('testa'));
```

### setAlias

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

### layout

- 设置组件优先级或者提升组件位置

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

### asVirtualGroup

- 设置交叉类型为group表单,可以用于更好的页面布局使用
- 未设置,返回FieldLogicGroup

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

- 设置后,返回FieldGroup

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

### asControl

- 将定义设置为表单控件
- 通常用于控件的类型定义是一个对象/数组,但是不需要分开用多个控件表示,而是像普通控件一样输出

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

### condition

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

### rawConfig

- 原始配置，允许直接访问和修改 field 配置

```ts
v.pipe(
  v.string(),
  rawConfig((item) => {
    item.inputs = { ...item.inputs, type: 'date' };
    return item;
  }),
);
```

### config

- 通用配置，用于设置渲染和表单配置

#### renderConfig

- 设置渲染配置（如 hidden、priority 等）

```ts
v.object({
  k1: v.pipe(v.pipe(v.optional(v.string(), 'k2  hidden')), renderConfig({ hidden: true })),
  k2: v.pipe(v.string(), renderConfig({ hidden: false })),
});
```

#### formConfig

- 基础禁用配置

```ts
v.pipe(v.string(), formConfig({ disabled: true }));
```

- 输入输出转换

```ts
v.pipe(
  v.string(),
  formConfig({
    transfomer: {
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

### hideWhen

- 隐藏条件，根据值的变化动态控制字段是否隐藏
- 可以设置`disabled`属性来表示隐藏时字段是否禁用

```ts
v.object({
  enable: v.pipe(v.boolean()),
  value: v.pipe(
    v.string(),
    hideWhen({
      disabled: true,
      listen: (fn, field) => {
        return fn({
          list: [['..', 'enable']],
        }).pipe(map((item) => !item.list[0]));
      },
    }),
  ),
});
```

### valueChange

- 值变更监听，监听字段值的变化并执行回调
- list为路径查询列表,设置`undefined`时表示自身组件

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

```ts
v.object({
  enable: v.pipe(v.boolean()),
  value: v.pipe(
    v.string(),
    valueChange((listen) => {
      listen({ list: [undefined, ['..', 'enable']] }).subscribe((value) => {
        console.log('value list', value.list);
        console.log('field', value.field);
        console.log('listenFields', value.listenFields);
      });
    }),
  ),
});
```

### disableWhen

- 禁用条件，根据值的变化动态控制字段是否禁用

```ts
v.object({
  enable: v.pipe(v.boolean()),
  value: v.pipe(
    v.string(),
    disableWhen({
      listen: (fn, field) => {
        return fn({
          list: [['..', 'enable']],
        }).pipe(map((item) => !item.list[0]));
      },
    }),
  ),
});
```

### nonFieldControl

- 设置表单控件不关联 formControl;也就是该控件被设置为一个普通的组件

```ts
v.object({
  key1: v.pipe(v.string(), nonFieldControl()),
});
```

### providers

- 提供者配置，用于在字段的 injector 中添加服务

#### providers.set

- 设置提供者（会覆盖所有已有的提供者）

```typescript
v.pipe(v.string(), actions.providers.set([Test1Service]));
```

#### providers.patch

- 补丁方式添加提供者

```typescript
v.pipe(v.string(), actions.providers.patch([{ provide: Test1Token, useValue: 123 }]));
```

#### providers.change

- 动态修改提供者列表

```typescript
v.pipe(
  v.string(),
  actions.providers.change((providers) => [...providers, newService]),
);
```
