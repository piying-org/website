# ngx-formly 迁移

- 实现与ngx-formly官网例子一样的用例

## [Introduction Example](https://formly.dev/docs/examples/introduction)

```ts
{
    context: {
      awesomeIsForced: new BehaviorSubject(false),
    },
    schema: v.pipe(
      v.object({
        text: v.pipe(
          v.string(),
          v.title('Text'),
          patchAttributes({ placeholder: 'Formly is terrific!' }),
        ),
        nested: v.pipe(
          v.optional(
            v.object({
              // 描述
              story: v.pipe(
                v.optional(v.string()),
                setComponent('textarea'),
                v.title('Some sweet story'),
                layout({ keyPath: ['..', '..'] }),
                patchAttributes({
                  placeholder:
                    'It allows you to build and maintain your forms with the ease of JavaScript :-)',
                }),
                patchAsyncProps({
                  description: (field) =>
                    field.context.awesomeIsForced.pipe(
                      map((value) =>
                        value
                          ? 'And look! This field magically got focus!'
                          : '',
                      ),
                    ),
                }),
                patchAsyncDirective((field) => ({
                  type: FocusDirective,
                  inputs: { focus: field.context.awesomeIsForced },
                })),
              ),
            }),
          ),
        ),
        awesome: v.pipe(
          v.optional(v.boolean()),
          disableWhen({
            listen: (fn, field) => field.context.awesomeIsForced,
          }),
          setComponent('checkbox'),
          patchAsyncProps({
            title: (field) =>
              field.context.awesomeIsForced.pipe(
                map((item) =>
                  item
                    ? 'Too bad, formly is really awesome...'
                    : 'Is formly totally awesome? (uncheck this and see what happens)',
                ),
              ),
          }),
        ),
        // 动态切换
        whyNot: v.pipe(
          v.optional(v.string()),
          setComponent('textarea'),
          v.title('Why Not?'),
          patchAttributes({ placeholder: 'Type in here... I dare you' }),
          hideWhen({
            disabled: true,
            listen: (fn) =>
              fn({ list: [['#', 'awesome']] }).pipe(
                map(({ list: [value] }) => value),
              ),
          }),
          patchAsyncAttributes({
            placeholder: (field) =>
              field.context.awesomeIsForced.pipe(
                map((item) =>
                  item
                    ? `Too bad... It really is awesome! Wasn't that cool?`
                    : 'Type in here... I dare you',
                ),
              ),
          }),
        ),
        custom: v.pipe(
          v.string(),
          setComponent('formly-custom-input-1'),
          v.title('Custom inlined'),
        ),
        __helper: v.pipe(NFCSchema, setComponent('domHelper')),
      }),
      setComponent('formly-group'),
    ),
  }
```
