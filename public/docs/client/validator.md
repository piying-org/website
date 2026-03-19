# 验证

> 皮影支持两种验证方式：Valibot 验证和控件自带验证。

## 两种验证方式

| 验证方式     | 说明                            |
| ------------ | ------------------------------- |
| Valibot 验证 | 在 Valibot 解析阶段进行，先执行 |
| 控件自带验证 | 在 Valibot 验证成功后执行       |

---

## Valibot 验证

### 特点

- 完全兼容 Valibot 中的所有验证 Action
- 可以使用 `v.check` 自定义验证
- 只能验证自身，无法以上下文值来验证
  > 如需通过上下文验证，请将验证写到父级
- 适用于前后端或其他输入解析也需要相同验证的场景

### 使用示例

```typescript
// 使用内置验证
v.pipe(v.string(), v.minLength(5));

// 自定义验证
v.pipe(
  v.string(),
  v.check((value) => value === 'k2-value', 'should input k2-value'),
);
```

### 国际化

Valibot 提供了预制的国际化支持：

```typescript
import '@valibot/i18n/zh-CN';
import { setGlobalConfig } from 'valibot';

const browserLanguage = navigator.language;
if (browserLanguage.startsWith('zh')) {
  setGlobalConfig({ lang: 'zh-CN' });
}
```

---

## 控件自带验证

### 特点

- 可参考 `formConfig` Action 中的 `validators`、`asyncValidators`
- 可以访问父级，根据其他字段的值判断
- 适用于复杂验证逻辑，希望在当前控件上处理时

### 使用方式

```ts
v.pipe(
  v.string(),
  formConfig({
    validators: [(value) => (value === 'k2-value' ? null : [{ kind: 'error' }])],
    asyncValidators: [(value) => Promise.resolve(value === 'k2-value' ? null : [{ kind: 'error' }])],
  }),
);
```

### 国际化

需要在需要显示异常信息的包装器、组件上自行实现国际化

---

## 验证顺序

1. **Valibot 验证**（先执行）
2. **控件自带验证**（后执行）
