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

## [Expression Properties](https://formly.dev/docs/examples/field-options/expression-properties)
```ts
{
    schema: v.pipe(
      v.object({
        text: v.pipe(
          v.string(),
          v.title('Text'),
          patchAttributes({
            placeholder: 'Type here to see the other field become enabled...',
          }),
        ),
        text2: v.pipe(
          v.string(),
          v.title('Hey!'),
          disableWhen({
            listen: (fn) => {
              return fn({ list: [['#', 'text']] }).pipe(
                map(({ list: [value] }) => !value),
              );
            },
          }),
        ),
        __helper: v.pipe(NFCSchema, setComponent('domHelper')),
      }),
      setComponent('formly-group'),
    ),
  }
```

## [Default Value](https://formly.dev/docs/examples/field-options/default-value)

```ts
{
    model: { lastName: 'Smith' },
    schema: v.pipe(
      v.object({
        firstName: v.pipe(
          v.optional(v.string(), 'This is a default value'),
          v.title('First Name (initialized via default value)'),
        ),
        lastName: v.pipe(
          v.optional(v.string(), 'This is a default value'),
          v.title('Last Name (initialized via the model)'),
        ),
        candy: v.pipe(
          v.optional(
            v.picklist(['snickers', 'baby_ruth', 'milky_way']),
            'milky_way',
          ),
          v.title('Favorite Candy (initialized via default value'),
          patchInputs({
            options: [
              { label: 'Snickers', value: 'snickers' },
              { label: 'Baby Ruth', value: 'baby_ruth' },
              { label: 'Milky Way', value: 'milky_way' },
            ],
          }),
        ),
        agree: v.pipe(v.boolean(), v.title('Agree? (not initialized at all)')),
        __helper: v.pipe(NFCSchema, setComponent('domHelper')),
      }),
      setComponent('formly-group'),
    ),
  }
```