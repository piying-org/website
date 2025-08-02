#

## 组件中获取配置实例

```typescript
import { PI_VIEW_FIELD_TOKEN } from '@piying/view-react';
import { useContext } from 'react';
const field = useContext(PI_VIEW_FIELD_TOKEN);
```

## 绑定表单

- `cva`用于外部自动绑定
- `cvaa`用于和现有的表单控件进行绑定

```typescript
const { cva, cvaa } = useControlValueAccessor();
  useImperativeHandle(props[CVA], () => cva, [cva]);
```

## useSignalToRef

- `signal`类型的值需要转换为`ref`才支持动态变更

```typescript
const inputs = useSignalToRef(props.field, (field) => field.inputs());
const outputs = useSignalToRef(props.field, (field) => field.outputs());
const renderConfig = useSignalToRef(props.field, (field) => field.renderConfig());
const attributes = useSignalToRef(props.field, (field) => field.attributes());
const wrappers = useSignalToRef(props.field, (field) => field.wrappers());
const fieldGroup = useSignalToRef(props.field, (field) => field.fieldGroup?.());
const fieldArray = useSignalToRef(props.field, (field) => field.fieldArray?.());
```
