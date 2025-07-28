# 验证

- valibot的验证会先工作,验证成功后,再执行控件验证

## valibot验证

- 完全兼容`valibot`中的所有验证Action
- 可以使用`v.check`自定义验证
- 只能验证自身,无法以上下文值来验证
  > 如果要通过上下文来验证只能将验证写到父级
- 当前后端或者其他输入解析也需要此验证时,建议使用

### 国际化

- 预制的验证Action,`valibot`上已经存在国际化

```typescript
import "@valibot/i18n/zh-CN";
import { setGlobalConfig } from "valibot";
const browserLanguage = navigator.language;
if (browserLanguage.startsWith("zh")) {
  setGlobalConfig({ lang: "zh-CN" });
}
```

## 控件自带验证

- 可以参考`formConfig`Action中的`validators`,`asyncValidators`
- 可以访问到父级,根据其他字段的值判断
- 当验证比较复杂,希望在当前控件上处理时,建议使用

### 国际化

- 需要自己在实现验证的`包装器`,`分组`上自行实现国际化
