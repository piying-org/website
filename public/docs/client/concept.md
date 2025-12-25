# 概念

## 组件

- 与大家理解的组件一致
- 可以通过依赖注入/上下文等方式查询`PI_VIEW_FIELD_TOKEN`,获取当前定义配置

### 控件

- 组件中实现了`ControlValueAccessor`的组件
- 包含输入值`writeValue`,值变更注册函数`registerOnChange`,已用状态注册函数`registerOnTouched`,是否禁用`setDisabledState`

```typescript
interface ControlValueAccessor {
  writeValue(obj: any): void;
  registerOnChange(fn: any): void;
  registerOnTouched(fn: any): void;
  setDisabledState?(isDisabled: boolean): void;
}
```

### 分组

- `object`/`intersect`/`union`/`tuple`/`array`等可以包含子组件的Schema
- 其中`intersect`配合`asVirtualGroup`可以创建一个逻辑上的普通分组,方便布局
- 通过分组可以定义`card`,`tabs`,`navbar`等容器,使控件以不同风格展示
  > 在一定程度上替代了[slot](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/slot)

### 包装器

- 让组件附加额外的能力,比如`显示控件的标签`,`验证内容`,`前后缀`等组件相关,共通的东西
- 包装器让开发者在封装组件的时候可以仅考虑该组件的基本功能,减少了代码耦合,增加了可维护性

## 字段顺序
- 字段顺序影响组件显示顺序
- 在使用`v.object({})`时,现代浏览器(除了IE11)的字段顺序都是可预测的;即优先非负整数升序键,然后是按照定义顺序来
  > https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
- 如果您想修改字段的显示顺序,除了调整定义顺序以外,还可以使用`layout({priority: -1 })`,默认为`0`,越小越靠前,越大越靠后

## Action/Pipe/Schema

- [valibot](https://valibot.dev/guides/mental-model/)中的概念

## Attributes/Events/Inputs/Outputs/Props

- 配置中的属性输入虽然分为四种,但是在不同的库/框架中表现不同,比如`React`中`Attribute/Input/Output`会合并到一起作为输入传入到组件

### Attributes

- html标签中的原生属性
### Events

- html标签中的原生属性

### Inputs

- 适配的库/框架的输入属性

### Outputs

- 适配的库/框架的输出属性

### Props

- 配置的通用属性,可以在当前组件/包装器中使用
- 设计上来讲`Props`可以完成所有工作(只要定义得当),但是为了更好的语义,所以分为多种属性;实际在开发中可以按照自己的习惯实现

## ControlValueAccessor
- 值访问控制器是用来连接表单控件与组件的一个设计,来源于[Angular](https://angular.dev/api/forms/ControlValueAccessor)
- 目前的封装中,分为`cva`(ControlValueAccessor缩写),用于导出自动注册,开发者只需要按照固定代码导出即可;`cvaa`(ControlValueAccessorAdapter缩写),用于注册组件,不同库/框架中有不同实现,但是原理相同,需要将对应的值,事件绑定到对应的组件上即可