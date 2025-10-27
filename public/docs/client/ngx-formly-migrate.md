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
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      nested: v.pipe(
        v.optional(
          v.object({
            story: v.pipe(
              v.optional(v.string()),
              setWrappers(['label', 'validator']),
              patchProps({ titlePosition: 'top' }),
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
                      value ? 'And look! This field magically got focus!' : '',
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
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'right' }),
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
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      custom: v.pipe(
        v.string(),
        setComponent('formly-custom-input-1'),
        v.title('Custom inlined'),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
    setComponent('strict_object'),
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
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      text2: v.pipe(
        v.string(),
        v.title('Hey!'),
        patchAttributes({
          placeholder: 'This one is disabled if there is no text in the other input',
        }),
        disableWhen({
          listen: (fn) => {
            return fn({ list: [['#', 'text']] }).pipe(
              map(({ list: [value] }) => !value),
            );
          },
        }),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
    setComponent('strict_object'),
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
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      lastName: v.pipe(
        v.optional(v.string(), 'This is a default value'),
        v.title('Last Name (initialized via the model)'),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
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
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      agree: v.pipe(
        v.boolean(),
        v.title('Agree? (not initialized at all)'),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'right' }),
      ),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
    setComponent('strict_object'),
  ),
}
```

## [Hide Fields](https://formly.dev/docs/examples/field-options/hide-fields)

```ts
{
  schema: v.pipe(
    v.object({
      name: v.pipe(
        v.optional(v.string()),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
        v.title('Name'),
        patchAttributes({
          placeholder: 'Type in here to display the hidden field',
        }),
      ),
      iLikeTwix: v.pipe(
        v.optional(v.boolean()),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'right' }),
        setComponent('checkbox'),
        v.title('I like twix'),
        hideWhen({
          disabled: true,
          listen: (fn) => {
            return fn({ list: [['#', 'name']] }).pipe(
              map(({ list: [value] }) => !value),
            );
          },
        }),
      ),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
    setComponent('strict_object'),
  ),
}
```

## [model-options](https://formly.dev/docs/examples/field-options/model-options)

```ts
{
  schema: v.pipe(
    v.strictObject({
      text: v.pipe(
        v.string(),
        v.title('Debounce'),
        formConfig({ pipe: { toModel: pipe(debounceTime(2000)) } }),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      updateOnBlur: v.pipe(
        v.string(),
        formConfig({ updateOn: 'blur' }),
        v.title('`updateOn` on Blur'),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      updateOnSubmit: v.pipe(
        v.string(),
        formConfig({ updateOn: 'submit' }),
        v.title('`updateOn` on Submit'),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      __helper: v.pipe(
        NFCSchema,
        setComponent('formHelper'),
        patchInputs({ forceEnableSubmit: true }),
      ),
    }),
  ),
}
```

## [Reset Model](https://formly.dev/docs/examples/form-options/reset-model)

```ts
{
  schema: v.strictObject({
    text: v.pipe(
      v.string(),
      v.title('Some awesome text'),
      patchAttributes({
        placeholder: 'Some sweet text',
      }),
      setWrappers(['label', 'validator']),
      patchProps({ titlePosition: 'top' }),
    ),
    candy: v.pipe(
      v.optional(v.picklist(['snickers', 'baby_ruth', 'milky_way'])),
      patchInputs({
        options: [
          { label: 'Snickers', value: 'snickers' },
          { label: 'Baby Ruth', value: 'baby_ruth' },
          { label: 'Milky Way', value: 'milky_way' },
        ],
      }),
      setWrappers(['label', 'validator']),
      patchProps({ titlePosition: 'top' }),
      v.title('Multiple Options'),
    ),
  }),
}
```

## [Form State](https://formly.dev/docs/examples/form-options/form-state)

```ts
{
  context: {
    disabled: new BehaviorSubject(true),
  },
  schema: v.pipe(
    v.strictObject({
      __btnToggle: v.pipe(
        NFCSchema,
        setComponent('button'),
        patchInputs({ label: 'Toggle' }),
        mergeOutputs({
          clicked: (event, field) => {
            field.context.disabled.next(!field.context.disabled.value);
          },
        }),
      ),
      text: v.pipe(
        v.string(),
        v.title('First Name'),
        disableWhen({
          listen: (fn, field) => {
            return field.context.disabled;
          },
        }),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
    }),
  ),
}
```

## [List of default / built-in validations](https://formly.dev/docs/examples/validation/built-in-validations)

```ts
{
  schema: v.pipe(
    v.strictObject({
      name: v.pipe(
        v.string(),
        v.title('Name (required)'),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      age: v.pipe(
        v.number(),
        v.title('Age (min= 18, max= 40)'),
        v.minValue(18),
        v.maxValue(40),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      password: v.pipe(
        v.string(),
        v.title('Password (minLength = 6)'),
        v.minLength(6),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      comment: v.pipe(
        v.string(),
        setComponent('textarea'),
        v.title('Comment (maxLength = 100)'),
        v.maxLength(100),
        patchAttributes({ rows: 5 }),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      ip: v.pipe(
        v.string(),
        v.title('IP Address (pattern = /(d{1,3}.){3}d{1,3}/)'),
        v.ipv4(),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ),
}
```

## [Custom validation](https://formly.dev/docs/examples/validation/custom-validation)

- 支持valibot验证/自定义验证,与表单自定义验证

```ts
{
  schema: v.pipe(
    v.strictObject({
      ip: v.pipe(
        v.string(),
        v.ip(),
        v.title('IP Address'),
        v.check((value) => {
          return true;
        }),
        formConfig({
          validators: [
            () => {
              return undefined;
            },
          ],
        }),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ),
}
```

## [Async validation of unique value](https://formly.dev/docs/examples/validation/unique-value-async-validation)

```ts
{
  schema: v.pipe(
    v.strictObject({
      username1: v.pipe(
        v.string(),
        v.title('Username (validated using `Promise`)'),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
        patchAttributes({ placeholder: 'Username' }),
        formConfig({
          asyncValidators: [
            (control) => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve(
                    ['user1', 'user2', 'user3'].indexOf(control.value) === -1
                      ? {
                          uniqueUsername: 'This username is already taken.',
                        }
                      : undefined,
                  );
                }, 1000);
              });
            },
          ],
        }),
      ),
      username2: v.pipe(
        v.string(),
        v.title('Username (validated using `Observable`)'),
        patchAttributes({ placeholder: 'Username' }),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
        formConfig({
          asyncValidators: [
            (control) => {
              return of(
                ['user1', 'user2', 'user3'].indexOf(control.value) === -1,
              ).pipe(
                map((value) => {
                  return value
                    ? {
                        uniqueUsername: 'This username is already taken.',
                      }
                    : undefined;
                }),
              );
            },
          ],
        }),
      ),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ),
}
```

## [Async validation and `updateOn`](https://formly.dev/docs/examples/validation/async-validation-update-on)

```ts
{
  schema: v.pipe(
    v.strictObject({
      username: v.pipe(
        v.string(),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
        v.title('Username (validated on `blur`)'),
        patchAttributes({ placeholder: 'Username' }),
        formConfig({
          updateOn: 'blur',
          asyncValidators: [
            (control) => {
              return of(
                ['user1', 'user2', 'user3'].indexOf(control.value) === -1,
              ).pipe(
                map((value) => {
                  return value
                    ? { uniqueUsername: 'This username is already taken.' }
                    : undefined;
                }),
              );
            },
          ],
        }),
      ),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ),
}
```

## [Matching Two Fields](https://formly.dev/docs/examples/validation/matching-two-fields)

```ts
{
  schema: v.pipe(
    v.strictObject({
      password: v.pipe(
        v.string(),
        v.title('Password'),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
        patchAttributes({
          type: 'password',
          placeholder: 'Must be at least 3 characters',
        }),
        v.minLength(3),
      ),
      passwordConfirm: v.pipe(
        v.string(),
        v.title('Confirm Password'),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
        patchAttributes({
          type: 'password',
          placeholder: 'Please re-enter your password',
        }),
      ),

      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
    v.forward(
      v.partialCheck(
        [['password'], ['passwordConfirm']],
        (input) => input.password === input.passwordConfirm,
        'The two passwords do not match.',
      ),
      ['passwordConfirm'],
    ),
  ),
}
```

## [Force showing error state](https://formly.dev/docs/examples/validation/force-show-error/)

```ts
{
  model: { showErrorState: true },
  schema: v.pipe(
    v.strictObject({
      email: v.pipe(
        v.string(),
        v.title('Email'),
        v.email(),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
        patchAttributes({ type: 'email' }),
        patchAsyncProps({
          forceShowError: (field) => {
            return field.get(['#', 'showErrorState'])?.form.control
              ?.valueChanges;
          },
        }),
      ),
      showErrorState: v.pipe(
        v.boolean(),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'right' }),
        v.title('Force show error state'),
      ),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ),
}
```

## [Toggle required field](https://formly.dev/docs/examples/validation/toggle-required/)

- 由于类型安全的原因,设计上不支持切换

## [Disable submit button](https://formly.dev/docs/examples/validation/disable-submit-button)

```ts
{
  schema: v.pipe(
    v.strictObject({
      text: v.pipe(
        v.string(),
        v.check((a) => !!a),
        v.title('Text'),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
        patchAttributes({ placeholder: 'This is required!' }),
      ),

      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ),
}
```

## [Table Rows](https://formly.dev/docs/examples/bootstrap-formly/table-rows)

```ts
{
  schema: v.pipe(
    v.strictObject({
      text: v.pipe(
        v.string(),
        setComponent('textarea'),
        v.title('Textarea with specified rows'),
        patchAttributes({ rows: 10, placeholder: 'This has 10 rows' }),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
    }),
  ),
}
```

## [Select](https://formly.dev/docs/examples/bootstrap-formly/select)

```ts
{
  schema: v.pipe(
    v.strictObject({
      marvel1: v.pipe(
        v.picklist([
          'iron_man',
          'captain_america',
          'black_widow',
          'hulk',
          'captain_marvel',
        ]),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
        v.title('Normal Select'),
        patchInputs({
          options: [
            { label: 'Iron Man', value: 'iron_man' },
            { label: 'Captain America', value: 'captain_america' },
            { label: 'Black Widow', value: 'black_widow' },
            { label: 'Hulk', value: 'hulk' },
            { label: 'Captain Marvel', value: 'captain_marvel' },
          ],
        }),
      ),
      marvel2: v.pipe(
        v.picklist([
          'iron_man',
          'captain_america',
          'black_widow',
          'hulk',
          'captain_marvel',
        ]),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
        v.title('Grouped Select'),
        patchInputs({
          options: [
            {
              label: 'Male',
              type: 'group',
              children: [
                { label: 'Iron Man', value: 'iron_man' },
                { label: 'Captain America', value: 'captain_america' },
                { label: 'Hulk', value: 'hulk' },
              ],
            },
            {
              label: 'Female',
              type: 'group',
              children: [
                { label: 'Black Widow', value: 'black_widow' },
                { label: 'Captain Marvel', value: 'captain_marvel' },
              ],
            },
          ],
        }),
      ),
      marvel3: v.pipe(
        v.picklist([
          'iron_man',
          'captain_america',
          'black_widow',
          'hulk',
          'captain_marvel',
        ]),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
        v.title('Select with custom name/value/group'),
        patchInputs({
          optionConvert: {
            children: (item) => item.list,
            label: (item) => item.label,
            value: (item) => item.value,
          },
          options: [
            {
              label: 'Male',
              type: 'group',
              list: [
                { label: 'Iron Man', value: 'iron_man' },
                { label: 'Captain America', value: 'captain_america' },
                { label: 'Hulk', value: 'hulk' },
              ],
            },
            {
              label: 'Female',
              type: 'group',
              list: [
                { label: 'Black Widow', value: 'black_widow' },
                { label: 'Captain Marvel', value: 'captain_marvel' },
              ],
            },
          ],
        }),
      ),
      marvel4: v.pipe(
        v.array(
          v.picklist([
            'iron_man',
            'captain_america',
            'black_widow',
            'hulk',
            'captain_marvel',
          ]),
        ),
        asControl(),
        componentClass('h-[200px]', true),
        v.title('Multi-select'),
        setComponent('multiselect'),
        patchInputs({
          options: [
            { label: 'Iron Man', value: 'iron_man' },
            { label: 'Captain America', value: 'captain_america' },
            { label: 'Black Widow', value: 'black_widow' },
            { label: 'Hulk', value: 'hulk' },
            { label: 'Captain Marvel', value: 'captain_marvel' },
          ],
        }),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ),
}
```

## [Advanced Layout](https://formly.dev/docs/examples/bootstrap-specific/advanced-layout)

```ts
{
  schema: v.pipe(
    v.intersect([
      v.pipe(
        v.object({
          firstName: v.pipe(
            v.optional(v.string()),
            v.title('First Name'),
            setWrappers(['label', 'validator']),
            patchProps({ titlePosition: 'top' }),
          ),
          lastName: v.pipe(
            v.optional(v.string()),
            v.title('Last Name'),
            setWrappers(['label', 'validator']),
            patchProps({ titlePosition: 'top' }),
            disableWhen({
              listen: (fn) =>
                fn({ list: [['#', 'firstName']] }).pipe(
                  map(({ list: [value] }) => !value),
                ),
            }),
          ),
        }),
        patchInputs({
          wrapperClass: 'grid grid-cols-2 gap-4',
        }),
        setComponent('strict_object'),
      ),
      v.object({ __divider: v.pipe(NFCSchema, setComponent('divider')) }),
      v.pipe(
        v.object({
          street: v.pipe(
            v.optional(v.string()),
            v.title('Street'),
            patchProps({
              itemClass: 'col-span-2',
            }),
            setWrappers(['label', 'validator']),
            patchProps({ titlePosition: 'top' }),
          ),
          cityName: v.pipe(
            v.optional(v.string()),
            v.title('City'),
            setWrappers(['label', 'validator']),
            patchProps({ titlePosition: 'top' }),
          ),
          zip: v.pipe(
            v.number(),
            v.title('Zip'),
            v.minValue(0),
            v.maxValue(99999),
            setWrappers(['label', 'validator']),
            patchProps({ titlePosition: 'top' }),
          ),
        }),
        patchInputs({
          wrapperClass: 'grid grid-cols-4 gap-4',
        }),
        v.title('Address:'),
        setComponent('strict_object'),
      ),
      v.object({ __divider: v.pipe(NFCSchema, setComponent('divider')) }),
      v.pipe(
        v.object({
          otherInput: v.pipe(
            v.optional(v.string()),
            v.title('Other Input'),
            setComponent('textarea'),
            setWrappers(['label', 'validator']),
            patchProps({ titlePosition: 'top' }),
          ),
          otherToo: v.pipe(
            v.optional(v.boolean()),
            v.title('Other Checkbox'),
            setWrappers(['label', 'validator']),
            patchProps({ titlePosition: 'right' }),
          ),
        }),
        setComponent('strict_object')
      ),
      v.object({ __helper: v.pipe(NFCSchema, setComponent('formHelper')) }),
    ]),
    asVirtualGroup(),
    setComponent('strict_object'),
  ),
}
```

## [Bootstrap Horizontal](https://formly.dev/docs/examples/bootstrap-specific/bootstrap-horizontal)

```ts
{
  schema: v.pipe(
    v.strictObject({
      email: v.pipe(
        v.string(),
        patchAttributes({
          type: 'email',
        }),
        setWrappers(['formlyField']),
        v.title('Email'),
        setWrappers(['formlyField']),
      ),
      password: v.pipe(
        v.string(),
        patchAttributes({
          type: 'password',
        }),
        setWrappers(['formlyField']),
        v.title('Password'),
        setWrappers(['formlyField']),
      ),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
    componentClass('flex flex-col gap-2'),
  ),
}
```

## [Input add-ons](https://formly.dev/docs/examples/bootstrap-specific/input-add-ons)

```ts
{
  schema: v.pipe(
    v.strictObject({
      left: v.pipe(
        v.string(),
        v.title('One add-on on the left (icon)'),
        setWrappers([
          'label',
          'validator',
          { type: 'joinItem', inputs: { prefix: { icon: 'attach_money' } } },
        ]),
        patchProps({ titlePosition: 'top' }),
        patchAttributes({
          placeholder: 'Formly is terrific!',
        }),
      ),
      both: v.pipe(
        v.string(),
        v.title('One add-on on both side (left: icon, right: text)'),
        setWrappers([
          'label',
          'validator',
          {
            type: 'joinItem',
            inputs: {
              prefix: { icon: 'home' },
              suffix: { text: '$' },
            },
          },
        ]),
        patchProps({ titlePosition: 'top' }),
        patchAttributes({
          placeholder: 'How great is this?',
        }),
      ),
      right: v.pipe(
        v.string(),
        v.title('One add-on on the right (icon)'),
        setWrappers([
          'label',
          'validator',
          {
            type: 'joinItem',
            inputs: {
              suffix: { icon: 'star' },
            },
          },
        ]),
        patchProps({ titlePosition: 'top' }),
        patchAttributes({
          placeholder: `Nice, isn't it??`,
        }),
      ),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ),
}
```

## [i18n ngx-translate](https://formly.dev/docs/examples/advanced/i18n)

```ts
{
  context: {
    lang: {
      en: {
        'FORM.LANG': 'Change language',
        'FORM.NAME': 'Name',
      },
      fr: { 'FORM.LANG': 'Changer la langue', 'FORM.NAME': 'Nom' },
    },
  },
  schema: v.pipe(
    v.strictObject({
      lang: v.pipe(
        v.picklist(['fr', 'en']),
        patchInputs({
          options: [
            { label: 'fr', value: 'fr' },
            { label: 'en', value: 'en' },
          ],
        }),
        valueChange((fn, field) => {
          fn().subscribe(({ list: [value] }) => {
            if (!value) {
              return;
            }
            v.setGlobalConfig({ lang: value });
          });
        }),
        patchAsyncProps({
          title: (field) => {
            return field.form.control?.valueChanges.pipe(
              map((item) => {
                if (!item) {
                  return;
                }
                return field.context.lang[item]['FORM.LANG'];
              }),
            );
          },
        }),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      name: v.pipe(
        v.string(),
        patchAsyncProps({
          title: (field) => {
            return field.get(['#', 'lang'])?.form.control?.valueChanges.pipe(
              map((item) => {
                if (!item) {
                  return;
                }
                return field.context.lang[item]['FORM.NAME'];
              }),
            );
          },
        }),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ),
}
```

## [i18n ngx-translate (alternative)](https://formly.dev/docs/examples/advanced/i18n-alternative)

- builder实现在源码`src/app/component/form/formly/translate.builder.ts`中

```ts
{
  builderType: 'translate',
  context: {
    i18n: {
      en: {
        'FORM.LANG': 'Change language',
        'FORM.NAME': 'Name',
      },
      fr: { 'FORM.LANG': 'Changer la langue', 'FORM.NAME': 'Nom' },
    },
    lang: new BehaviorSubject('en'),
  },
  schema: v.pipe(
    v.strictObject({
      lang: v.pipe(
        v.picklist(['fr', 'en']),
        patchInputs({
          options: [
            { label: 'fr', value: 'fr' },
            { label: 'en', value: 'en' },
          ],
        }),
        valueChange((fn, field) => {
          fn().subscribe(({ list: [value] }) => {
            if (!value) {
              return;
            }
            v.setGlobalConfig({ lang: value });
            field.context.lang.next(value);
          });
        }),
        v.title('FORM.LANG'),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      name: v.pipe(
        v.string(),
        v.title('FORM.NAME'),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ),
}
```

## [JSON Schema](https://formly.dev/docs/examples/advanced/json-schema/)

```ts
{
  schema: v.pipe(
    v.strictObject({
      toggle: v.pipe(
        v.optional(
          v.tuple(
            [
              'simple',
              'nested',
              'arrays',
              'numbers',
              'references',
              'schema_dependencies',
              'null_field',
              'nullable',
              'allOf',
              'anyOf',
              'oneOf',
              'select_alternatives',
            ].map((item) => {
              return v.pipe(
                NFCSchema,
                setComponent('button'),
                patchInputs({ label: item }),
                mergeOutputs({
                  clicked: (_, field) => {
                    // todo
                    fetch(`ngx-formly/json-schema/${item}_json`)
                      .then((item) => item.json())
                      .then((result) => {
                        field
                          .get(['#', 'jsonSchema'])
                          .inputs.update((value) => {
                            return { ...value, data: result };
                          });
                      });
                  },
                }),
              );
            }),
          ),
        ),
        setComponent('object'),
        setWrappers(['block']),
        nonFieldControl(),
      ),
      jsonSchema: v.pipe(
        v.any(),
        setComponent('jsonSchema'),
        patchInputs({ data: undefined }),
      ),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
    patchInputs({wrapperClass:'flex gap-2 flex-wrap *:last:w-full'})
  ),
}
```

## [Repeating Section](https://formly.dev/docs/examples/advanced/repeating-section/)

```ts
{
  model: { tasks: [''] },
  schema: v.pipe(
    v.strictObject({
      tasks: v.pipe(
        v.optional(
          v.array(
            v.pipe(
              v.string(),
              patchAttributes({
                placeholder: 'Task name',
              }),
            ),
          ),
        ),
        v.title('TODO LIST'),
        setComponent('array-rw'),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ),
}
```

## [Repeating Section With Length Input](https://formly.dev/docs/examples/advanced/repeating-section-input)

```ts
{
  model: { investmentsCount: 3 },
  schema: v.pipe(
    v.strictObject({
      investmentsCount: v.pipe(
        v.optional(v.number(), 3),
        v.minValue(1),
        v.title('Investments count'),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      investments: v.pipe(
        v.array(
          v.pipe(
            v.string(),
            v.title('Name of Investment:'),
            setWrappers(['label', 'validator']),
            patchProps({ titlePosition: 'top' }),
          ),
        ),
        patchAsyncInputs({
          fixedLength: (field) => {
            return field.get(['#', 'investmentsCount'])?.form.control
              ?.valueChanges;
          },
        }),
        setComponent('array-rw'),
      ),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ),
}
```

## [Multi-Step Form](https://formly.dev/docs/examples/advanced/multi-step-form)

```ts
{
  model: {},
  schema: v.pipe(
    v.strictObject({
      steps: v.pipe(
        v.intersect([
          v.pipe(
            v.object({
              firstname: v.pipe(
                v.string(),
                v.title('First name'),
                setWrappers(['label', 'validator']),
              ),
              age: v.pipe(
                v.number(),
                v.title('Age'),
                patchProps({ titlePosition: 'top' }),
              ),
            }),
            v.title('Personal data'),
            setComponent('strict_object'),
          ),
          v.pipe(
            v.object({
              country: v.pipe(
                v.string(),
                v.title('Country'),
                setWrappers(['label', 'validator']),
                patchProps({ titlePosition: 'top' }),
              ),
            }),
            v.title('Destination'),
            setComponent('strict_object'),
          ),
          v.pipe(
            v.object({
              day: v.pipe(
                v.string(),
                setComponent('date'),
                v.title('Day of the trip'),
                setWrappers(['label', 'validator']),
                patchProps({ titlePosition: 'top' }),
              ),
            }),
            v.title('Day of the trip'),
            setComponent('strict_object'),
          ),
        ]),
        setComponent('steps'),
      ),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ),
}
```

## [Tabs Form](https://formly.dev/docs/examples/advanced/tabs)

```ts
{
  model: {},
  schema: v.pipe(
    v.strictObject({
      steps: v.pipe(
        v.intersect([
          v.pipe(
            v.object({
              firstname: v.pipe(
                v.string(),
                v.title('First name'),
                setWrappers(['label', 'validator']),
                patchProps({ titlePosition: 'top' }),
              ),
              age: v.pipe(
                v.number(),
                v.title('Age'),
                setWrappers(['label', 'validator']),
                patchProps({ titlePosition: 'top' }),
              ),
            }),
            v.title('Personal data'),
            setComponent('strict_object'),
          ),
          v.pipe(
            v.object({
              country: v.pipe(
                v.string(),
                v.title('Country'),
                setWrappers(['label', 'validator']),
                patchProps({ titlePosition: 'top' }),
              ),
            }),
            v.title('Destination'),
            setComponent('strict_object'),
          ),
          v.pipe(
            v.object({
              day: v.pipe(
                v.string(),
                setComponent('date'),
                v.title('Day of the trip'),
                setWrappers(['label', 'validator']),
                patchProps({ titlePosition: 'top' }),
              ),
            }),
            v.title('Day of the trip'),
            setComponent('strict_object'),
          ),
        ]),
        setComponent('tabs'),
        patchInputs({
          stepsLike: true,
        }),
      ),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ),
}
```

## [Extending Field Types](https://formly.dev/docs/examples/advanced/extending-field-types)

```ts
{
  schema: v.pipe(
    v.strictObject({
      input: v.pipe(
        v.optional(v.string()),
        v.title('Input Field'),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      'default-password': v.pipe(
        v.optional(v.string()),
        patchAttributes({ type: 'password' }),
        v.title('Default Password Field'),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      'customized-password': v.pipe(
        v.optional(v.string()),
        patchAttributes({ type: 'password' }),
        v.title('Password Field (with custom label)'),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ),
}
```

## [Cascaded Select (using observable)](https://formly.dev/docs/examples/other/cascaded-select)

```ts
{
  model: { sport: '1' },
  schema: v.pipe(
    v.strictObject({
      sport: v.pipe(
        v.picklist(['1', '2']),
        v.title('Sport'),
        patchInputs({
          options: [
            { id: '1', name: 'Soccer' },
            { id: '2', name: 'Basketball' },
          ],
          optionConvert: {
            label: (item) => item.name,
            value: (item) => item.id,
          },
        }),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      team: v.pipe(
        v.picklist(['1', '2', '3', '4']),
        v.title('Sport'),
        patchAsyncInputs({
          options: (field) => {
            let options = [
              { id: '1', name: 'Bayern Munich', sportId: '1' },
              { id: '2', name: 'Real Madrid', sportId: '1' },
              { id: '3', name: 'Cleveland', sportId: '2' },
              { id: '4', name: 'Miami', sportId: '2' },
            ];
            return field.get(['#', 'sport'])?.form.control?.valueChanges.pipe(
              map((value) => {
                return options.filter((item) => item.sportId === value);
              }),
              tap(() => {
                field.form.control?.reset();
              }),
            );
          },
        }),
        patchInputs({
          optionConvert: {
            label: (item) => item.name,
            value: (item) => item.id,
          },
        }),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      player: v.pipe(
        v.picklist(['1', '2', '3', '4', '5', '6', '7', '8']),
        v.title('Player'),
        patchAsyncInputs({
          options: (field) => {
            let options = [
              { id: '1', name: 'Bayern Munich (Player 1)', teamId: '1' },
              { id: '2', name: 'Bayern Munich (Player 2)', teamId: '1' },
              { id: '3', name: 'Real Madrid (Player 1)', teamId: '2' },
              { id: '4', name: 'Real Madrid (Player 2)', teamId: '2' },
              { id: '5', name: 'Cleveland (Player 1)', teamId: '3' },
              { id: '6', name: 'Cleveland (Player 2)', teamId: '3' },
              { id: '7', name: 'Miami (Player 1)', teamId: '4' },
              { id: '8', name: 'Miami (Player 2)', teamId: '4' },
            ];
            return field.get(['#', 'team'])?.form.control?.valueChanges.pipe(
              map((value) => {
                return options.filter((item) => item.teamId === value);
              }),
              tap(() => {
                field.form.control?.reset();
              }),
            );
          },
        }),
        patchInputs({
          optionConvert: {
            label: (item) => item.name,
            value: (item) => item.id,
          },
        }),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),

      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ),
}
```

## [Bind Observables to Select](https://formly.dev/docs/examples/other/observable-select)

```ts
{
  model: {},
  schema: v.pipe(
    v.strictObject({
      sport: v.pipe(
        v.picklist(['1', '2']),
        v.title('Sport'),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
        patchInputs({
          optionConvert: {
            label: (item) => item.name,
            value: (item) => item.id,
          },
        }),
        patchAsyncInputs({
          options: (field) =>
            of([
              { id: '1', name: 'Soccer' },
              { id: '2', name: 'Basketball' },
            ]),
        }),
      ),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ),
}
```

## [Advanced Layout (Flex)](https://formly.dev/docs/examples/other/advanced-layout-flex)

- 实现方式与`Advanced Layout`相同

## [Nested Forms (fieldGroup wrapper)](https://formly.dev/docs/examples/other/nested-formly-forms)

```ts
{
  schema: v.pipe(
    v.strictObject({
      firstName: v.pipe(
        v.string(),
        v.title('First Name'),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      address: v.pipe(
        v.object({
          town: v.pipe(
            v.string(),
            v.title('Town'),
            setWrappers(['label', 'validator']),
            patchProps({ titlePosition: 'top' }),
          ),
        }),
        v.title('Address'),
        setWrappers(['panel']),
      ),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ),
}
```

## [Material Prefix and Suffix](https://formly.dev/docs/examples/other/material-prefix-suffix)

```ts
{
  schema: v.pipe(
    v.strictObject({
      input: v.pipe(
        v.string(),
        v.title('Firstname'),
        setWrappers([
          'label',
          'validator',
          {
            type: 'joinItem',
            inputs: {
              prefix: { icon: 'face' },
              suffix: { text: '$' },
            },
          },
        ]),
        patchProps({ titlePosition: 'top' }),
      ),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ),
}
```

## [Material Field Hint Alignment](https://formly.dev/docs/examples/other/material-formfield-hint-align)

```ts
{
  schema: v.pipe(
    v.strictObject({
      Input: v.pipe(
        v.string(),
        v.title('Input with string hints'),
        patchAttributes({ placeholder: 'Placeholder' }),
        patchProps({
          hintStart:
            'hintStart accepts strings and TemplateRefs and is aligned to start',
          hintEnd:
            'hintEnd accepts strings and TemplateRefs and is aligned to end',
        }),
        setWrappers(['formlyField']),
      ),
      Input2: v.pipe(
        v.string(),
        v.title('Input with template hints'),
        patchAttributes({ placeholder: 'Placeholder' }),
        patchProps({
          hintStart:
            'hintStart accepts strings and TemplateRefs and is aligned to start',
          hintEnd:
            'hintEnd accepts strings and TemplateRefs and is aligned to end',
        }),
        setWrappers(['formlyField']),
      ),
      Input3: v.pipe(
        v.string(),
        v.title('Input with description'),
        patchAttributes({
          placeholder:
            'Description field accepts strings and gets aligned to start',
        }),
        setWrappers(['formlyField']),
      ),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ),
}
```

## [Buttons](https://formly.dev/docs/examples/other/button)

```ts
{
  schema: v.pipe(
    v.strictObject({
      __btn1: v.pipe(
        NFCSchema,
        setComponent('button'),
        patchInputs({ label: 'With Function' }),
        mergeOutputs({
          clicked: () => {
            alert('You clicked me!');
          },
        }),
      ),
      __btn2: v.pipe(
        NFCSchema,
        setComponent('button'),
        patchInputs({ label: 'JSON Only', classStyle: 'btn-info' }),
        v.title('Click this guy'),
        mergeOutputs({
          clicked: (event, field) => {
            field.get(['#', 'someInput']).form.control.updateValue('clicked!');
          },
        }),
        patchProps({
          description: 'These can have labels and stuff too if you want....',
        }),
      ),
      someInput: v.pipe(
        v.string(),
        v.title('Some Input'),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ),
}
```

## [JSON powered](https://formly.dev/docs/examples/other/json-powered)

- 请参考`JSON Schema`实现

## [File input](https://formly.dev/docs/examples/other/input-file)

```ts
{
  schema: v.pipe(
    v.strictObject({
      file: v.pipe(v.any(), setComponent('fileInput')),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ),
}
```

## [Field Presets](https://formly.dev/docs/examples/other/presets)

```ts
{
  schema: v.pipe(
    v.strictObject({
      salutation: v.pipe(
        v.string(),
        setComponent('salutation'),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      firstName: v.pipe(
        v.optional(v.string()),
        setComponent('firstName'),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      lastName: v.pipe(
        v.string(),
        setComponent('lastName'),
        setWrappers(['label', 'validator']),
        patchProps({ titlePosition: 'top' }),
      ),
      __helper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ),
}
```
