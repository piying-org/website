# Action

- [valibot](https://valibot.dev/guides/mental-model/)中的概念

## 验证

- 可以使用valibot中内置的`Validation`作为表单验证器

```typescript
v.pipe(v.string(), v.minLength(5));
```

## 转换

- 支持表单多级输出转换,
- 默认的valibot`transform`仅支持视图到模型转换,如果需要回显,则需要配置`formConfig({ transfomer: { toView(value, control) {} } })`

```typescript
v.pipe(
  v.object({
    k1: v.pipe(
      v.string(),
      v.transform((a) => {
        return `${a}1`;
      }),
    ),
  }),
  v.transform((a) => {
    return JSON.stringify(a);
  }),
);
```

## 属性设置

- 支持组件的各种设置
- `actions[attributes|class|events|hooks|inputs|outputs|props|providers|wrappers][set|patch|remove|patchAsync|patchAsync|mapAsync|merge]`

```typescript
actions.attributes.set;
actions.attributes.patch;
actions.attributes.remove;
actions.attributes.patchAsync;
actions.attributes.mapAsync;
actions.hooks.merge;
```
