# 我开源了一个表单库 - 元数据定义一次,即可渲染

- 地址[piying-view](https://github.com/piying-org/piying-view)
- 我查看了市面上所有的表单库,都有一个致命的缺点,定义多次才能实现表单
- 比如,像下面的代码(伪代码)

```ts
interface Test {
  firstName: string;
}
```

```ts
const form = useForm<Test>({
  defaultValues: {
    firstName: "default",
  },
  onSubmit: async ({ value }) => {
    console.log(value);
  },
});
```

```tsx
<form.Field
  name="firstName"
  //...
/>
```

- 众所周知,实现的越多,那么未来出现错误的概率越大
- 像上面的场景,如果我们想修改`firstName`为`name`,那么至少需要修改三次,这极大的增加了代码的不稳定性
- 所以我实现了一个表单库[皮影](https://piying-org.github.io/website/docs/client/intro).仅用一次定义,实现了以上所有逻辑

```ts
const define = v.object({ firstName: v.optional(v.string(), "default") });
```

- 并且,可以很容易获得类型

```ts
type Define=v.InferOutput<typeof define>
// 等价于
type Define = {
  v1: string;
};
```

## 皮影是如何实现上面的逻辑的?

- 首先感谢[valibot](https://valibot.dev/guides/mental-model/),上面的代码其实就是一个简单的`schema`定义
- 皮影实现了一个遍历器,收集相关元数据
- 然后将元数据转换为组件和表单配置
- 使其可以在任何前端框架上使用

## 定义是固定的,那么怎么实现布局呢?

- 皮影实现了布局移动,通过`layout`方法可以将任何控件移动到可以存在子级的schema中

```ts
v.intersect([
  v.pipe(v.object({}), setAlias("scope1")),
  v.object({
    key1: v.pipe(
      v.object({
        test1: v.pipe(v.optional(v.string(), "value1"), layout({ keyPath: ["#", "@scope1"] })),
      }),
    ),
  }),
]);
```

- 也就是说,定义虽然是固定的,但是在视图中是可以自由决定位置的,做到了定义与视图位置分离
- 关于`object`的字段顺序,则可以[参照MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in#description)

## 如何进行更加高级的布局?

- 我们都知道,有时候不仅仅要显示字段,可能还需要更多额外的功能
- 比如控件的标签,验证,悬停提示,则可以通过包装器实现

```ts
v.pipe(v.number(), v.title("k2-label"), setWrappers(["label"]));
```

- 而如果要修改空间组的样式,则可以自定义组件
  > 虽然包装器也可以用于控件组,但是直接自定义会更方便些

```ts
v.pipe(
  v.object({
    k1: v.pipe(v.string(), v.title("k1-label"), setWrappers(["label"])),
    k2: v.pipe(v.number(), v.title("k2-label"), v.minValue(10), setWrappers(["label", "validator"])),
  }),
  setComponent("fieldset"),
);
```

## 如何自定义包装器/组件?

- 上面的一些代码,我并没有说是应用于哪个前端框架,因为它们都是通用的
- 而包装器和组件的定义却是每个框架各有不同的方法
- 大家可以查看[快速开始](https://piying-org.github.io/website/docs/client/quick-start)查找自己所使用的框架的定义方法.目前已支持`Angular`,`Vue`,`React`,如果您还需要其他框架兼容,欢迎[反馈](https://github.com/piying-org/piying-view/issues)

## 现在是否可以使用?

- [皮影表单](https://github.com/piying-org/piying-view)在正式开源之前,已经经过半年以上的内部使用,绝大部分功能已经经过严格的测试.代码覆盖率达到了95%以上;完全可以应用于生成环境
- 皮影表单实现了很多的[用例演示](https://piying-org.github.io/website/docs/client/component-use)及对市面上的主流库的用例做了等价的实现,方便大家迁移
- 皮影当前支持`Angular`,`Vue`,`React`,`Svelte`,`Solid`
- [ngx-formly 用例实现](https://piying-org.github.io/website/docs/client/ngx-formly-migrate)
- [vee-validate 用例实现](https://piying-org.github.io/vee-validate-migration/)
- [formik 用例实现](https://piying-org.github.io/formik-migration/)
- [react-hook-form 用例实现](https://piying-org.github.io/website/docs/client/react-hook-form-migration)
- [react-tanstack用例实现](https://piying-org.github.io/react-tanstack-migration/)
