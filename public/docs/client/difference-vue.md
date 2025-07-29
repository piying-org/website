#

## signalToRef

- `signal`类型的值需要转换为`ref`才支持动态变更

```typescript
const inputs = signalToRef(() => props.field.inputs());
const outputs = signalToRef(() => props.field.outputs());
const renderConfig = signalToRef(() => props.field.renderConfig());
const attributes = signalToRef(() => props.field.attributes());
const wrappers = signalToRef(() => props.field.wrappers());
const fieldGroup = signalToRef(() => props.field.fieldGroup?.());
const fieldArray = signalToRef(() => props.field.fieldArray?.());
```
