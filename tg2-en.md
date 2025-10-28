# I've open-sourced a form library — define metadata once, and it can be rendered anywhere.

- After reviewing all major form libraries on the market, I identified a critical flaw: they require **repeated definitions** to build a form.
- For example, consider the following (pseudo-code):

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

- As we all know, the more times you define something, the higher the chance of introducing bugs.
- In the above scenario, if we want to rename `firstName` to `name`, we’d need to update it in **at least three places** — significantly increasing code fragility.
- That’s why I created **[Piying](https://piying-org.github.io/website/docs/client/intro)** — a form library that achieves **all the above functionality with just one definition**.

```ts
v.object({ firstName: v.optional(v.string(), "default") });
```

## How Does Piying Achieve This?

- First, thanks to [valibot](https://valibot.dev/guides/mental-model/), the code above is simply a schema definition.
- Piying implements a **traversal engine** that collects metadata from the schema.
- This metadata is then transformed into **components and form configurations**, enabling full compatibility across any frontend framework.

## But What About Layout Flexibility?

- While the schema definition is fixed, Piying supports **dynamic layout manipulation** via the `layout` method.
- You can move any field into a container schema that supports nesting — meaning **you can freely rearrange the UI layout without changing the schema**.

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

- This effectively **decouples definition from visual positioning**.
- Regarding field order in `object`, refer to the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in#description) for details on JavaScript’s object property iteration order.

## How to Achieve Advanced Layouts?

- Sometimes, you need more than just field rendering — think labels, validation hints, tooltips, etc.
- These can be achieved using **wrappers**:

```ts
v.pipe(v.number(), v.title("k2-label"), setWrappers(["label"]));
```

- If you want to customize the styling of a group of fields, you can define a custom component directly:
  > While wrappers can be used for field groups, direct component customization is often more convenient.

```ts
v.pipe(
  v.object({
    k1: v.pipe(v.string(), v.title("k1-label"), setWrappers(["label"])),
    k2: v.pipe(v.number(), v.title("k2-label"), v.minValue(10), setWrappers(["label", "validator"])),
  }),
  setComponent("fieldset"),
);
```

## How to Customize Wrappers or Components?

- The code examples above don’t specify a particular frontend framework — because they’re **framework-agnostic**.
- However, **wrapper and component definitions** are framework-specific.
- You can find setup instructions for your preferred framework in the [Quick Start Guide](https://piying-org.github.io/website/docs/client/quick-start).  
  Currently supported: **React**, **Vue**, and **Angular**.  
  If you need support for another framework, feel free to [open an issue](https://github.com/piying-org/piying-view/issues).

## Is It Ready for Production?

- **Piying Form** has been used internally for over half a year before public open-source release.
- Most features have undergone rigorous testing.  
  Code coverage exceeds **95%**, making it production-ready.
- We provide extensive [use case demos](https://piying-org.github.io/website/docs/client/component-use) and equivalent implementations of popular libraries to ease migration:
  - [ngx-formly Migration](https://piying-org.github.io/website/docs/client/ngx-formly-migrate)
  - [vee-validate Migration](https://piying-org.github.io/vee-validate-migration/)
  - [Formik Migration](https://piying-org.github.io/formik-migration/)
  - [React Hook Form Migration](https://piying-org.github.io/website/docs/client/react-hook-form-migration)
  - [React TanStack Migration](https://piying-org.github.io/react-tanstack-migration/)

## Project Repository

- [piying-view](https://github.com/piying-org/piying-view)

## Contact Me

- If you have any feedback, suggestions, or questions, feel free to reach out: `wszgrcy@gmail.com`
