#

## 组件中获取配置实例

```typescript
import { PI_VIEW_FIELD_TOKEN } from "@piying/view-svelte";
import { getContext } from "svelte";
const field = getContext<PI_VIEW_FIELD_TOKEN>(PI_VIEW_FIELD_TOKEN);
```

## 绑定表单

- `cva`用于外部自动绑定
- `cvaa`用于和现有的表单控件进行绑定

```typescript
import { useControlValueAccessor } from "@piying/view-svelte";
const { cva, cvaa } = useControlValueAccessor();
export { cva };
```

## signalToState

- `signal`类型的值需要转换为`state`才支持动态变更

```typescript
const inputs = signalToState(() => field().inputs());
const outputs = signalToState(() => field().outputs());
const renderConfig = signalToState(() => field().renderConfig());
const attributes = signalToState(() => field().attributes());
const wrappers = signalToState(() => field().wrappers());
const fieldChilren = signalToState(() => field().children?.());
```
