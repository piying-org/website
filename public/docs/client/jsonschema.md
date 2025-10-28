# JsonSchema

- 目前进行实验性支持
- [游乐场](https://piying-org.github.io/website/jsonschema-playground)
- 对`JsonSchema`的支持本质上是将其转换为`Valibot`定义,然后进行解析

## 支持程度

- 传入度数据不可存在死结
  > 如果某些字段在验证过程中,始终失败,则为死结

```json
{
  //👎
  "propertyNames": false,
  "properties": { "a": { "type": "string" } },
  //👎
  "required": ["a"]
}
```

- `const`/`enum`出现时优先转换,忽略其他验证
  > 即当出现限定范围的字段时,优先实现

```json
{
  //✅
  "enum": [1, 2, 3],
  //🚫
  "type": "string"
}
```

- 一个`schema`中只允许出现`allOf`/`oneOf`/`anyOf`/`if/then/else`其中之一子模式
  > `not`不在此限制中

```json
//❌
{ "allOf": [], "oneOf": [] }
//✅
{ "allOf": [] }
//✅
{ "oneOf": [] }
```

- `allOf`/`oneOf`/`anyOf`/`if/then/else`子模式内不支持子模式

```json
{
  "allOf": [
    {
      //❌
      "anyOf": []
    }
  ]
}
```

- `$ref`仅支持单文件,不支持远程引用

## 需要注册组件

- [参考文件](https://github.com/piying-org/website/blob/master/src/app/component/define.ts)

### group

#### oneOf-condition/anyOf-condition

- 子模式下存在相同字段时使用

```json
{
  "oneOf": [
    {
      "properties": {
        "cond1": { "const": 1 },
        "value1": { "type": "string" }
      },
      "required": ["cond1"]
    },
    {
      "properties": {
        "cond1": { "const": 2 },
        "value2": { "type": "string" }
      },
      "required": ["cond1"]
    }
  ]
}
```

#### oneOf-select/anyOf-select

- 需要组件中实现手动选择一个或多个子条件
- [参考文件](https://github.com/piying-org/website/blob/master/src/app/component/logic-group/component.ts)

```json
{
  "oneOf": [
    {
      "title": "item1",
      "properties": {
        "value1": { "type": "string" }
      }
    },
    {
      "title": "item2",
      "properties": {
        "value2": { "type": "string" }
      }
    }
  ]
}
```

#### loose_object/object_with_rest/object

```json
{
  "properties": {
    "k1": { "type": "string" },
    "k2": { "type": "number" },
    "k3": { "enum": ["1", "2"] }
  }
}
```

```json
{
  "properties": {
    "k1": { "type": "string" },
    "k2": { "type": "number" },
    "k3": { "enum": ["1", "2"] }
  },
  "required": ["k1"]
}
```

#### tuple/loose_tuple/tuple_with_rest

```json
{
  "prefixItems": [{ "type": "boolean" }, { "type": "number" }]
}
```

#### intersect/union

- 验证使用,可视为普通的object类型

### control

#### picklist/multiselect/multiselect-repeat

- 选择类型,会自动传入`options`输入属性,对应组件需要实现
- 参考[实现文件](https://github.com/piying-org/website/blob/master/src/app/component/select/component.ts#L61)

```json
{
  "enum": ["1", "2"]
}
```

```json
{
  "items": {
    "enum": ["1", "2"]
  }
}
```

```json
{
  "items": {
    "enum": ["1", "2"]
  },
  "uniqueItems": true
}
```

#### number

```json
{
  "type": "number",
  "minimum": 5
}
```

```json
{
  "type": "integer",
  "minimum": 5
}
```

#### string

- 字符串

```json
{
  "type": "string",
  "minLength": 3
}
```

#### boolean

- 布尔值

```json
{
  "title": "isUsed",
  "type": "boolean"
}
```

#### any

- 其他未知的类型

#### null

- null类型

## 调用

- [参考文件](https://github.com/piying-org/website/blob/master/src/app/component/json-schema/component.ts)
- 将`jsonschema`转换为`valibot`定义后,即可与传统的`piying`使用一致

```typescript
import { jsonSchemaToValibot } from "@piying/view-angular-core/adapter";

jsonSchemaToValibot(jsonSchema);
```

## 自定义actions

- 在schema项中定义`actions`字段即可

```json
{
  "type": "string",
  "title": "Select 4: Radio button",
  "enum": ["Option 1", "Option 2", "Option 3"],
  "actions": [
    {
      "name": "setComponent",
      "params": ["radio"]
    }
  ]
}
```

- 如果传入其他自定义的actions,则需要注册
- [参考文件](https://github.com/piying-org/website/blob/master/src/app/component/json-schema/component.ts#L56)

```json
{
  "type": "string",
  "actions": [
    {
      "name": "testTitle",
      "params": []
    }
  ]
}
```

## 其他

- 如果遇到问题欢迎[反馈](https://github.com/piying-org/website/issues)
