#

## 组件中获取配置实例
```typescript
import { inject } from "vue";
import { PI_VIEW_FIELD_TOKEN } from "@piying/view-vue";
const field = inject(PI_VIEW_FIELD_TOKEN)!;
```

## 绑定表单
- `cva`用于外部自动绑定
- `cvaa`用于和现有的表单控件进行绑定

```typescript
const {
  cva,
  cvaa: { value, valueChange, disabled, touchedChange },
} = useControlValueAccessor();
defineExpose({ cva });
```

## signalToRef

- `signal`类型的值需要转换为`ref`才支持动态变更

```typescript
const inputs = signalToRef(() => props.field.inputs());
const outputs = signalToRef(() => props.field.outputs());
const renderConfig = signalToRef(() => props.field.renderConfig());
const attributes = signalToRef(() => props.field.attributes());
const wrappers = signalToRef(() => props.field.wrappers());
const fieldChilren = signalToRef(() => props.field.children?.());
```
