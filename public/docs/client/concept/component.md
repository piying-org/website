# 组件

- 与大家理解的组件一致;不同前端框架有不同的组件定义方式
- `piying`可以直接调用已经支持的前端框架大部分组件
- 组件的实例可以参考[快速开始](docs/client/quick-start)中的例子和demo

## 普通组件

- 应该设计为一个原子化组件,减少外部依赖
- 可以使用服务来获得外部数据

### 限制

- 对于存在`ng-content`/`slot`等投影/插槽类传参,则需要重新设计代码使用

### 使用

- 普通组件没有类型,因此也没有自动映射,需要指定组件映射名或者直接将组件定义传入

```typescript
import * as v from "valibot";
// angular
import { NFCSchema, setComponent } from "@piying/view-angular-core";
// other
// import { NFCSchema, setComponent } from "@piying/view-core";
v.pipe(NFCSchema, setComponent("xxx"));
v.pipe(NFCSchema, setComponent(XXX));
```

## 控件

- 在普通组件的基础上,适配`ControlValueAccessor`
- 支持表单控件的输入/输出,验证,数据转换等相关逻辑

### ControlValueAccessor

- 值访问控制器是用来连接表单控件与组件的一个设计,来源于[Angular](https://angular.dev/api/forms/ControlValueAccessor)
- 目前的设计中,分为`cva`(ControlValueAccessor缩写),用于导出自动注册,开发者只需要按照固定代码导出即可;`cvaa`(ControlValueAccessorAdapter缩写),用于注册组件,不同库/框架中有不同实现,但是原理相同,需要将对应的值,事件绑定到对应的组件上即可

```typescript
interface ControlValueAccessor {
  writeValue(obj: any): void;
  registerOnChange(fn: any): void;
  registerOnTouched(fn: any): void;
  setDisabledState?(isDisabled: boolean): void;
}
```

### 使用

- 定义中注册后可以直接使用;也可以手动指定

```typescript
import * as v from "valibot";
// angular
import { setComponent } from "@piying/view-angular-core";
// other
// import { setComponent } from "@piying/view-core";
v.string();
v.pipe(v.string(), setComponent("xxx"));
v.pipe(v.string(), setComponent(XXX));
```

## 分组

- `object`/`intersect`/`union`/`tuple`/`array`等可以包含子组件的Schema
- 其中`intersect`配合`asVirtualGroup`可以创建一个逻辑上的普通分组,方便布局
- 通过分组可以定义`card`,`tabs`,`navbar`等容器,使控件以不同风格展示
  > 在一定程度上替代了[slot](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/slot)

### 使用

- 可以包含其他组件

```typescript
import * as v from "valibot";
// angular
import { setComponent } from "@piying/view-angular-core";
// other
// import { setComponent } from "@piying/view-core";
v.object({ k1: v.string() });
v.pipe(v.object({ k1: v.string() }), setComponent("xxx"));
v.pipe(v.object({ k1: v.string() }), setComponent(XXX));
```

## 包装器

- 让组件附加额外的能力,比如`显示控件的标签`,`验证内容`,`前后缀`等组件相关,共通的东西
- 包装器让开发者在封装组件的时候可以仅考虑该组件的基本功能,减少了代码耦合,增加了可维护性

### 使用

- 包装器可以在所有(非包装器)组件中使用

```typescript
import * as v from "valibot";
// angular
import { actions, setComponent } from "@piying/view-angular-core";
// other
// import { actions, setComponent } from "@piying/view-core";
v.pipe(v.string(), actions.wrappers.patch(["label"]));
v.pipe(v.object({ k1: v.string() }), actions.wrappers.patch(["label"]));
v.pipe(v.object({ k1: v.string() }), actions.wrappers.patch([{ type: XXX, attributes: {}, inputs: {} }]));
```
