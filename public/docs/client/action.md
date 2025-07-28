# Action

- 此概念[来源](https://valibot.dev/guides/mental-model/)于`valibot`
- 您可以简单的理解为元数据设置

## rawConfig

- 几乎所有的`皮影Action`都来源于此Action
- 如果提供的Action不满足您的开发需要,可以自行封装
- 该函数输入为一个函数,其输入变量为当前的`SchemaHandle`,可以处理所有暴露的变量

## setComponent

- 默认情况下,比如使用`v.string()`时,会自动查找注册的`string`配置;但是您也可以使用此方法手动指定
- 此方法也支持手动指定组件定义,但是不推荐,因为会让维护变的困难
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

- 与`valueChange`类似,可以同时监听多个`组件`的事件

```typescript
outputChange((fn) => {
  fn([
    { list: undefined, output: "output1" },
    { list: ["..", "k1"], output: "output2" },
  ]).subscribe((value) => {});
});
```

## set/remove/patch/patchAsync(inputs/props/attributes/output)

- 此类方法都是用来设置组件的
- `set`替换当前输入设置
- `remove`删除某一项
- `patch`与已有配置合并
  > 需要注意的是,如果之前存在字段`xx`的配置,再次设置`xx`时,之前的值会被替换
- `patchAsync`动态设置某些值,可以读取到field和上下文,支持`Promise`/`Observable`/`Signal`;非上述类型的值会直接返回

```typescript
patchAsyncInputs({
  value1: (field) => {
    field.context;
    const subject = new BehaviorSubject(1);
    return subject;
  },
});
```

## topClass

- 由于存在`wrapper`,所以布局的时候,顶层的组件不一定是定义组件,而有可能是wrapper,所以就需要使用此类进行设置
- 默认为替换当前类,也可以设置`true`合并已有类

```typescript
topClass("abcd", true);
```

## componentClass

- 与`topClass`类似,只不过是设置组件自身的

```typescript
componentClass("abcd");
```

## layout

- 移动组件到指定的位置
- `priority`表示优先级,数字越小,位置越靠前

```typescript
layout({ keyPath: ["#"], priority: -2 });
```
