#

## 组件中获取配置实例

```typescript
import { PI_VIEW_FIELD_TOKEN } from "@piying/view-solid";
import { useContext } from "solid-js";
const field = useContext(PI_VIEW_FIELD_TOKEN);
```

## 绑定表单

- `cva`用于外部自动绑定
- `cvaa`用于和现有的表单控件进行绑定

```typescript
const result = useControlValueAccessor();
createMemo(() => {
  props[CVA](result.cva);
});
```

## createSignalConvert

- 通用`signal`类型的值需要转换为solid`signal`才支持动态变更

```typescript
const inputs = createSignalConvert(() => field.inputs());
const outputs = createSignalConvert(() => field.outputs());
const renderConfig = createSignalConvert(() => field.renderConfig());
const attributes = createSignalConvert(() => field.attributes());
const wrappers = createSignalConvert(() => field.wrappers());
const fieldChilren = createSignalConvert(() => field.children?.());
```
