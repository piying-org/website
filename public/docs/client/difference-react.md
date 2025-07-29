#

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
