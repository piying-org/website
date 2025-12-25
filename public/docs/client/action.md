# Action

- 此概念[来源](https://valibot.dev/guides/mental-model/)于`valibot`
- 您可以简单的理解为元数据设置

## rawConfig

- 几乎所有的`皮影Action`都来源于此Action
- 如果提供的Action不满足您的开发需要,可以自行封装
- 该函数输入为一个函数,其输入变量为当前的`SchemaHandle`,可以处理所有暴露的变量

## setComponent

- 默认情况下,比如使用`v.string()`时,会自动查找注册的`string`配置;但是您也可以使用此方法手动指定
- 此方法也支持直接指定组件定义,但是不推荐,因为会让维护变的困难
  > 除非此组件仅在此地方使用并且只使用一次,否则还是建议先注册再使用

## formConfig

- 用于调整表单控件使用,非表单控件不需要
- `disabled`是否禁用
- `disabledValue`禁用时值是否删除(默认删除)
- `transfomer`输入/输出值时进行转换
- `pipe`输出值时可以进行防抖处理(rxjs pipe)
- `validators`表单验证
  > 推荐使用`valibot`的`v.check`
- `asyncValidators`异步表单验证
- `updateOn`合适输出值
- `emptyValue`当值为空时,返回的默认值
  > 仅适用于`array/group/logic group`
- `deletionMode`
- `deletionMode`array子项被删除时,应该设置为undefined还是跳过;默认为跳过

## renderConfig

- `hidden`控制是否隐藏

## disableWhen

- 控制`控件`何时禁用,支持多控件监听

```typescript
disableWhen({
  listen: (fn, field) => {
    return fn({
      list: [["..", "enable"]],
    }).pipe(map((item) => !item.list[0]));
  },
});
```

## hideWhen

- 控制`组件`何时隐藏
- 可以控制组件隐藏时,是否禁用控件

```typescript
hideWhen({
  disabled: false,
  listen: (fn, field) => {
    return fn({
      list: [["..", "enable"]],
    }).pipe(map((item) => !item.list[0]));
  },
});
```

## valueChange

- 监听控件的值变更
- 与`hideWhen`,`disableWhen`类似,支持多个控件监听

```typescript
valueChange((listen) => {
  listen({ list: [["..", "enable"]] }).subscribe((value) => {});
});
```

## outputChange

- 与`valueChange`类似

```typescript
outputChange((fn) => {
  fn([
    { list: undefined, output: "output1" },
    { list: ["..", "k1"], output: "output2" },
  ]).subscribe((value) => {});
});
```

## actions.[propertyName].[method]

- `属性名`: inputs/props/attributes/outputs/wrappers/events
- `方法名`: set/remove/patch/patchAsync/merge/mergeAsync/map/mapAsync
- 用来设置组件相关属性
- `set`替换当前输入设置
- `remove`删除某一项
- `patch`与已有配置合并({...a,...b})
- `patchAsync`与`patch`相同,可以获得field和上下文,支持`Promise`/`Observable`/`Signal`;非上述类型的值会直接赋值
- `merge`用于`outputs`/`events`,允许设置多个监听
- `mergeAsync`与`merge`相同,可以获得field
- `map`类似数组/rxjs的`map`方法,信号值变更后进行运算
- `mapAsync`与`map`相同,可以获得field

### 举例

```typescript
actions.inputs.patchAsync({
  value1: (field) => {
    // context
    field.context;
    const subject = new BehaviorSubject(1);
    return subject;
  },
});
```

## actions.class

### top

- 由于存在`wrapper`,所以布局的时候,顶层的组件不一定是定义组件,而有可能是wrapper,所以就需要使用此类进行设置
- 默认为替换当前类,也可以设置`true`合并已有类

```typescript
actions.class.top("abcd", true);
```

### bottom(component)

- 与`actions.class.top`类似,只不过是设置组件自身的

```typescript
actions.class.component("abcd");
```

## layout

- 移动组件到指定的位置
- `priority`表示优先级,数字越小,位置越靠前

```typescript
layout({ keyPath: ["#"], priority: -2 });
```

## asVirtualGroup

- 使用`intersect`时,会自动创建一个`LogicGroup`,使用此方法可以不创建控件组,而是一个普通的分组(等价于v.object)

## asControl

- 使用`v.array(v.string())`时,如果不想表示为`FieldArray`,而是仅仅想视为一个普通的类型`FieldControl`时使用

## setAlias

- 设置别名,用于路径查询
