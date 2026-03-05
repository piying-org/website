# field

- 可以视为属性配置;解析valibot定义后出现,保存组件的一些配置及控件的一些状态

- 当前只能通过解析valibot定义获得,不过可以通过不同的actions来修改相关配置

## 组件属性

- 配置中的属性输入虽然分为多种,但是在不同的库/框架中表现不同,比如`React`中`Attribute/Input/Output`会合并到一起作为输入传入到组件
- 大部分属性,可以使用actions预设工具设置:
- `actions.attributes.set` 设置,会清空已有
- `actions.attributes.patch` 设置,增加
- `actions.attributes.remove` 删除
- `actions.attributes.patchAsync` 设置,可以读取field实例,返回支持的异步属性
- `actions.attributes.mapAsync` 映射,可以读取field实例,类似Array.map
- `actions.outputs.path` 监听事件,设置监听,重复设置会覆盖
- `actions.outputs.merge` 合并监听,允许某个事件被监听多次

### Attributes

- html标签中的原生属性

### Events

- html标签中的原生属性

### Inputs

- 适配的库/框架的输入属性

### Outputs

- 适配的库/框架的输出属性

## props

- 配置的通用属性,设置可以在当前组件/包装器中使用
- 设计上来讲`props`可以完成所有工作(只要定义得当),但是为了更好的语义,所以分为多种属性;实际在开发中可以按照自己的习惯实现

## injector

- 依赖注入的注入器实例,通过它获得相关token及服务实例

### Providers

- 定义时存在
- 声明依赖注入中在该组件上实例化的服务
- 该服务的作用域为在当前组件及其子级,也就是可以通过它来进行组件间的数据通讯

## hooks

- 目前大多数时候使用`allFieldsResolved`,也就是所有field解析完毕,但是还没有初始化组件
- `fieldResolved`仅当前配置已经解析

## context

- 解析时传入的上下文

## fixedChildren/restChildren/children

- 分组使用的字段,一般用来控制子级的显示
- `fixedChildren` 固定子项,比如`v.object({})`,`v.tuple([])`中的子级
- `restChildren` 动态子项,比如`v.array(v.any())`,`v.record(v.any(),v.any())`
- `children`所有子项

## get

- 查询其他的属性配置;通过[路径查询](docs/client/path-query)获得当前定义上的其他属性配置

## form

- 当前配置上的form状态
- 如果该组建没有适配`ControlValueAccessor`,那么`control`不存在
