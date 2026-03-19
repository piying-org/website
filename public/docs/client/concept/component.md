# 组件

- 与大家理解的组件一致;不同前端框架有不同的组件定义方式
- `piying`可以直接调用已经支持的前端框架大部分组件
- 组件的实例可以参考[快速开始](docs/client/quick-start)中的例子和demo
- 可以通过依赖注入/上下文等方式查询 `PI_VIEW_FIELD_TOKEN` 获取 `Field` 配置

## 普通组件

- 应该设计为一个原子化组件,减少外部依赖
- 可以使用服务来获得外部数据

### 限制

- 对于存在`ng-content`/`slot`等投影/插槽类传参,则需要重新设计代码使用

### 使用

- 普通组件没有类型,因此也没有自动映射,需要指定组件映射名或者直接将组件定义传入

```typescript
import * as v from 'valibot';
// angular
import { NFCSchema, setComponent } from '@piying/view-angular-core';
// other
// import { NFCSchema, setComponent } from "@piying/view-core";
v.pipe(NFCSchema, setComponent('xxx'));
v.pipe(NFCSchema, setComponent(XXX));
```

## 控件

- 在普通组件的基础上,适配`ControlValueAccessor`
- 支持表单控件的输入/输出,验证,数据转换等相关逻辑

### CVA / CVAA

| 名称                                 | 说明                                   |
| ------------------------------------ | -------------------------------------- |
| `CVA` (ControlValueAccessor)         | 导出自动注册，开发者按固定代码导出即可 |
| `CVAA` (ControlValueAccessorAdapter) | 注册组件，将值和事件绑定到组件上       |

> CVA 来源于 Angular，目前各框架均有不同实现，但原理相同

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
import * as v from 'valibot';
// angular
import { setComponent } from '@piying/view-angular-core';
// other
// import { setComponent } from "@piying/view-core";
v.string();
v.pipe(v.string(), setComponent('xxx'));
v.pipe(v.string(), setComponent(XXX));
```

## 分组

- 支持嵌套子组件的 Schema 类型
- 包括：`object`、`intersect`、`union`、`tuple`、`array`等类型
- `intersect` ,`union`为逻辑分组,提供更复杂的业务
- 可定义 `card`、`tabs`、`navbar` 等容器
  > 在一定程度上替代了[slot](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/slot)

### 使用

- 可以包含其他组件

```typescript
import * as v from 'valibot';
// angular
import { setComponent } from '@piying/view-angular-core';
// other
// import { setComponent } from "@piying/view-core";
v.object({ k1: v.string() });
v.pipe(v.object({ k1: v.string() }), setComponent('xxx'));
v.pipe(v.object({ k1: v.string() }), setComponent(XXX));
```

### 字段顺序

- 字段顺序影响组件显示顺序
- 现代浏览器（除 IE11）支持可预测的字段顺序：优先非负整数升序键，然后按定义顺序
- 可通过 `layout({ priority: -1 })` 调整顺序（默认为 `0`，越小越靠前）

## 包装器

- 为组件附加通用能力（标签、验证、前后缀等）
- 让开发者专注于组件基本功能，减少耦合

### 使用

- 包装器可以在所有(非包装器)组件中使用

```typescript
import * as v from 'valibot';
// angular
import { actions, setComponent } from '@piying/view-angular-core';
// other
// import { actions, setComponent } from "@piying/view-core";
v.pipe(v.string(), actions.wrappers.patch(['label']));
v.pipe(v.object({ k1: v.string() }), actions.wrappers.patch(['label']));
v.pipe(v.object({ k1: v.string() }), actions.wrappers.patch([{ type: XXX, attributes: {}, inputs: {} }]));
```
