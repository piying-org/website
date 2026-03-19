# Action 详解

> Action 是 [Valibot]((https://valibot.dev/guides/mental-model/))中元数据设置的扩展，现用于配置组件行为、表单控件、事件监听等。

## 验证

可以使用 Valibot 中内置的 `Validation` 作为表单验证器：

```typescript
v.pipe(v.string(), v.minLength(5));
```

## 转换

支持表单多级输出转换：

| 转换方向    | 说明                                                                                    |
| ----------- | --------------------------------------------------------------------------------------- |
| 视图 → 模型 | Valibot 的 `transform`以及`formConfig({ transformer: { toModel(value, control) {} } })` |
| 模型 → 视图 | `formConfig({ transformer: { toView(value, control) {} } })`                            |

```typescript
v.pipe(
  v.object({
    k1: v.pipe(
      v.string(),
      v.transform((a) => `${a}1`),
    ),
  }),
  v.transform((a) => JSON.stringify(a)),
);
```

## 属性设置

- 支持组件的各种设置：
- `actions[attributes|class|events|hooks|inputs|outputs|props|providers|wrappers][set|patch|remove|patchAsync|patchAsync|mapAsync|merge]`

```typescript
actions.attributes.set;
actions.attributes.patch;
actions.attributes.remove;
actions.attributes.patchAsync;
actions.attributes.mapAsync;
actions.hooks.merge;
```
