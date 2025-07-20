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
        __helper: v.pipe(NFCSchema, setComponent('formHelper')),
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
        __helper: v.pipe(NFCSchema, setComponent('formHelper')),
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
        __helper: v.pipe(NFCSchema, setComponent('formHelper')),
      }),
      setComponent('formly-group'),
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
          v.title('Name'),
          patchAttributes({
            placeholder: 'Type in here to display the hidden field',
          }),
        ),
        iLikeTwix: v.pipe(
          v.optional(v.boolean()),
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
      setComponent('formly-group'),
    ),
  }
```

## [model-options](https://formly.dev/docs/examples/field-options/model-options)

- submit/debounce不直接支持,但可以使用其他逻辑代替

```ts
{
    schema: v.pipe(
      v.object({
        updateOnBlur: v.pipe(
          v.string(),
          formConfig({ updateOn: 'blur' }),
          v.title('`updateOn` on Blur'),
        ),
        __helper: v.pipe(NFCSchema, setComponent('formHelper')),
      }),
      setComponent('formly-group'),
    ),
  }
```

## [Reset Model](https://formly.dev/docs/examples/form-options/reset-model)

```ts
{
    schema: v.pipe(
      v.object({
        text: v.pipe(
          v.string(),
          v.title('Some awesome text'),
          patchAttributes({
            placeholder: 'Some sweet text',
          }),
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
        ),
      }),
      setComponent('formly-group'),
    ),
  }
```

## [Form State](https://formly.dev/docs/examples/form-options/form-state)

```ts
{
    context: {
      disabled: new BehaviorSubject(true),
    },
    schema: v.pipe(
      v.object({
        __btnToggle: v.pipe(
          NFCSchema,
          setComponent('button'),
          patchInputs({ label: 'Toggle' }),
          mergeOutputs({
            click: (event, field) => {
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
        ),
      }),
      setComponent('formly-group'),
    ),
  }
```

## [List of default / built-in validations](https://formly.dev/docs/examples/validation/built-in-validations)

```ts
{
    schema: v.pipe(
      v.object({
        name: v.pipe(v.string(), v.title('Name (required)')),
        age: v.pipe(
          v.number(),
          v.title('Age (min= 18, max= 40)'),
          v.minValue(18),
          v.maxValue(40),
        ),
        password: v.pipe(
          v.string(),
          v.title('Password (minLength = 6)'),
          v.minLength(6),
        ),
        comment: v.pipe(
          v.string(),
          setComponent('textarea'),
          v.title('Comment (maxLength = 100)'),
          v.maxLength(100),
          patchAttributes({ rows: 5 }),
        ),
        ip: v.pipe(
          v.string(),
          v.title('IP Address (pattern = /(d{1,3}.){3}d{1,3}/)'),
          v.ipv4(),
        ),
        __helper: v.pipe(NFCSchema, setComponent('formHelper')),
      }),
      setComponent('formly-group'),
    ),
  }
```

## [Custom validation](https://formly.dev/docs/examples/validation/custom-validation)

- 支持valibot验证/自定义验证,与表单自定义验证

```ts
{
    schema: v.pipe(
      v.object({
        ip: v.pipe(
          v.string(),
          v.ip(),
          v.title('IP Address'),
          v.check((value) => {
            return true;
          }),
          formConfig({
            validators: [
              (ab) => {
                return undefined;
              },
            ],
          }),
        ),
        __helper: v.pipe(NFCSchema, setComponent('formHelper')),
      }),
      setComponent('formly-group'),
    ),
  }
```

## [Async validation of unique value](https://formly.dev/docs/examples/validation/unique-value-async-validation)

```ts
{
    schema: v.pipe(
      v.object({
        username1: v.pipe(
          v.string(),
          v.title('Username (validated using `Promise`)'),
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
      setComponent('formly-group'),
    ),
  }
```

## [Async validation and `updateOn`](https://formly.dev/docs/examples/validation/async-validation-update-on)

```ts
{
    schema: v.pipe(
      v.object({
        username: v.pipe(
          v.string(),
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
      setComponent('formly-group'),
    ),
  }
```

## [Matching Two Fields](https://formly.dev/docs/examples/validation/matching-two-fields)

```ts
{
    schema: v.pipe(
      v.object({
        password: v.pipe(
          v.string(),
          v.title('Password'),
          patchAttributes({
            type: 'password',
            placeholder: 'Must be at least 3 characters',
          }),
          v.minLength(3),
        ),
        passwordConfirm: v.pipe(
          v.string(),
          v.title('Confirm Password'),
          patchAttributes({
            type: 'password',
            placeholder: 'Please re-enter your password',
          }),
        ),

        __helper: v.pipe(NFCSchema, setComponent('formHelper')),
      }),
      setComponent('formly-group'),
      v.forward(
        v.partialCheck(
          [['password'], ['passwordConfirm']],
          (input) => input.password === input.passwordConfirm,
          'The two passwords do not match.'
        ),
        ['passwordConfirm']
      )
    ),
  }
```

## [Force showing error state](https://formly.dev/docs/examples/validation/force-show-error/)

```ts
{
    model: { showErrorState: true },
    schema: v.pipe(
      v.object({
        email: v.pipe(
          v.string(),
          v.title('Email'),
          v.email(),
          patchAttributes({ type: 'email' }),
          patchAsyncProps({
            forceShowError: (field) => {
              return field
                .get(['#', 'showErrorState'])
                ?.form.control?.valueChanges;
            },
          }),
        ),
        showErrorState: v.pipe(v.boolean(), v.title('Force show error state')),
        __helper: v.pipe(NFCSchema, setComponent('formHelper')),
      }),
      setComponent('formly-group'),
    ),
  }
```

## [Toggle required field](https://formly.dev/docs/examples/validation/toggle-required/)

- 由于类型安全的原因,设计上不支持切换


## [Disable submit button](https://formly.dev/docs/examples/validation/disable-submit-button)

```ts
{
    schema: v.pipe(
      v.object({
        text: v.pipe(
          v.string(),
          v.check((a ) => !!a),
          v.title('Text'),
          patchAttributes({ placeholder: 'This is required!' }),
        ),

        __helper: v.pipe(NFCSchema, setComponent('formHelper')),
      }),
      setComponent('formly-group'),
    ),
  }
```

## [Table Rows](https://formly.dev/docs/examples/bootstrap-formly/table-rows)

```ts
{
    schema: v.pipe(
      v.object({
        text: v.pipe(
          v.string(),
          setComponent('textarea'),
          v.title('Textarea with specified rows'),
          patchAttributes({ rows: 10, placeholder: 'This has 10 rows' }),
        ),
      }),
      setComponent('formly-group'),
    ),
  }
```


## [Select](https://formly.dev/docs/examples/bootstrap-formly/select)

```ts
{
    schema: v.pipe(
      v.object({
        marvel1: v.pipe(
          v.picklist([
            'iron_man',
            'captain_america',
            'black_widow',
            'hulk',
            'captain_marvel',
          ]),
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
          componentClass('h-[200px]',true),
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
        ),
        __helper: v.pipe(NFCSchema, setComponent('formHelper')),
      }),
      setComponent('formly-group'),
    ),
  }
```