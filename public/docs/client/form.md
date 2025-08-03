# 表单

## 类型

### FieldGroup

- 基本等价于`Record<string,any>`

### FieldArray

- 基本等价于`any[]`

### FieldLogicGroup

- 逻辑或/与
- 允许启用部分子级

### FieldControl

- 直接与组件绑定的类,表单中的最基础单位

## 状态

- 表单中带`$$`属于`Signal`

### disabled

- 是否禁用
- 禁用状态取决于两个值,自身是否禁用和父级是否禁用,满足其一即禁用
### touched/untouched

- 控件使用过/未使用过
- 使用过不代表发射过值,可能是点击过一次,一般为触发`blur`后变成`touched`

### dirty/pristine

- 控件发射过值/未发射过值

### valid/invalid/pending

- 控件的值目前验证有效/无效/正在验证中


## 值变化

### 模型到视图

1. 根级`updateValue`
2. 分发到FieldControl级`updateValue`
3. 视图变更过?强制更新:仅与上次不同才更新,同时设置表单值
4. 进行模型到视图转换(`transfomer.toView`),允许输入值在写入到视图时进行修改

### 视图到模型

1. 视图变更
2. 如果值禁用,不发射值
3. 默认下直接触发变更,设置`updateOn:'blur'`后要等待`touched`发射
4. 进行rxjs管道处理`pipe.toModel`
5. 进行转换处理`transfomer.toModel`
   > 这两个未来可能合成为一个,因为管道可以实现的更多,比如防抖
6. 进行`valibot`解析,解析失败会写入验证异常,标记为`dirty`
7. 设置设置表单值
8. 触发值变更,开启异步获取值
9. 如果值没有异常/没有禁用或维持之前的值,那么可以发射获取到,否则跳过

## 值更新时机(updateOn)
- `change`控件值变更发射时更新
- `blur` touchedChange触发时更新(一般为blur事件触发)
- `submit` 调用控件的`emitSubmit`方法后更新(一般为form的submit事件后调用)

## reset
- 设置后状态恢复到`untouched`,`pristine`
- 值恢复为默认值(如果没有传入)

## updateValue

- 此方法单纯为表单更新值,也就是模型到视图

## viewValueChange

- 控件发出值使用;直接使用仅会模拟发出值,视图部分不变
- 一般为适配不同的库/框架时使用

## 变更监听

- `field.valueChanges`可以监听模型值变更
- `field.statusChanges`可以监听模型值变更
