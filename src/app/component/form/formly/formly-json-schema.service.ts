import { JSONSchema7, JSONSchema7Definition } from 'json-schema';
import { map, tap } from 'rxjs/operators';
import rfdc from 'rfdc';
import * as v from 'valibot';
import {
  asControl,
  formConfig,
  hideWhen,
  patchInputs,
  patchProps,
  setComponent,
  valueChange,
} from '@piying/view-angular-core';
import * as jsonActions from '@piying/view-angular-core';
const clone = rfdc({ proto: false, circles: false });
type FormlyFieldConfig = any;
type ResolvedSchema =
  | v.BaseSchema<any, any, any>
  | v.SchemaWithPipe<
      // @ts-ignore // TODO: Remove comment
      readonly [
        v.BaseSchema<any, any, any>,
        ...(
          | v.BaseSchema<any, any, any>
          | v.PipeAction<any, any, v.BaseIssue<unknown>>
        )[],
      ]
    >;
function objAndSameType(obj1: any, obj2: any) {
  return (
    isObject(obj1) &&
    isObject(obj2) &&
    Object.getPrototypeOf(obj1) === Object.getPrototypeOf(obj2) &&
    !(Array.isArray(obj1) || Array.isArray(obj2))
  );
}
function reverseDeepMerge(dest: any, ...args: any[]) {
  args.forEach((src) => {
    for (const srcArg in src) {
      if (isNil(dest[srcArg]) || isBlankString(dest[srcArg])) {
        dest[srcArg] = clone(src[srcArg]);
      } else if (objAndSameType(dest[srcArg], src[srcArg])) {
        reverseDeepMerge(dest[srcArg], src[srcArg]);
      }
    }
  });
  return dest;
}

// check a value is null or undefined
function isNil(value: any) {
  return value == null;
}

function isBlankString(value: any) {
  return value === '';
}

function getSchemaAction(schema: FormlyJSONSchema7) {
  let action = [];
  if ('title' in schema) {
    action.push(v.title(schema['title']!));
  }
  if ('description' in schema) {
    action.push(v.description(schema['description']!));
  }
  if ('minLength' in schema) {
    action.push(v.minLength(schema['minLength']!));
  }
  if ('maxLength' in schema) {
    action.push(v.maxLength(schema['maxLength']!));
  }
  if ('pattern' in schema) {
    action.push(v.regex(new RegExp(schema['pattern']!)));
  }
  if ('minimum' in schema) {
    action.push(v.minValue(schema.minimum!));
  }
  if ('maximum' in schema) {
    action.push(v.maxValue(schema.maximum!));
  }
  if ('exclusiveMinimum' in schema) {
    action.push(v.gtValue(schema.exclusiveMinimum!));
  }
  if ('exclusiveMaximum' in schema) {
    action.push(v.ltValue(schema.exclusiveMaximum!));
  }
  if ('multipleOf' in schema) {
    action.push(v.multipleOf(schema.multipleOf!));
  }
  if ('minItems' in schema) {
    action.push(v.minLength(schema.minItems!));
  }
  if ('maxItems' in schema) {
    action.push(v.maxLength(schema.maxItems!));
  }
  if ('uniqueItems' in schema) {
    action.push(
      v.check((input: any[]) => {
        return new Set(input).size === input.length;
      }),
    );
  }
  if ('maxProperties' in schema) {
    action.push(
      v.check((input: Record<string, any>) => {
        return Object.keys(input).length <= schema.maxProperties!;
      }),
    );
  }
  if ('minProperties' in schema) {
    action.push(
      v.check((input: Record<string, any>) => {
        return Object.keys(input).length >= schema.minProperties!;
      }),
    );
  }
  if ('actions' in schema) {
    for (const rawAction of schema.actions!) {
      action.push(
        (jsonActions as any)[rawAction.name].apply(undefined, rawAction.params),
      );
    }
  }

  return action;
}

interface FormlyJSONSchema7 extends JSONSchema7 {
  actions?: { name: string; params: any[] }[];
}

function isEmpty(v: any) {
  return v === '' || v == null;
}

function isObject(v: any) {
  return v != null && typeof v === 'object' && !Array.isArray(v);
}

function isConst(schema: JSONSchema7Definition) {
  return (
    typeof schema === 'object' &&
    (schema.hasOwnProperty('const') ||
      (schema.enum && schema.enum.length === 1))
  );
}

interface IOptions {
  schema: FormlyJSONSchema7;
  ignoreDefault?: boolean;
  strict?: boolean;
  /** 对象中使用 */
  unionKey?: string;
}

export class JsonSchemaToValibot {
  toValibot(schema: JSONSchema7): FormlyFieldConfig {
    this.cacheSchema = new WeakMap();
    schema = clone(schema);
    return this._toValibot(schema, { schema });
  }
  private cacheSchema!: WeakMap<any, any>;
  private __toValibotWrapper(
    schema: FormlyJSONSchema7,
    { ...options }: IOptions,
  ) {
    if (this.cacheSchema.has(schema)) {
      return this.cacheSchema.get(schema);
    }
    let result = this._toValibot(schema, { ...options });
    this.cacheSchema.set(schema, result);
    return result;
  }
  private _toValibot(
    schema: FormlyJSONSchema7,
    { ...options }: IOptions,
  ): ResolvedSchema | undefined {
    schema = this.resolveSchema(schema, options);
    let actionList = getSchemaAction(schema);
    let configList: any[] = [];
    const types = this.guessSchemaType(schema);
    const type = types[0];

    if (!options.ignoreDefault && schema.readOnly) {
      configList.push(formConfig<any>({ disabled: true }));
    }
    let createTypeFn = <T extends v.BaseSchema<any, any, any>>(input: T) =>
      v.pipe(input, ...actionList, ...configList);

    if (!options.ignoreDefault && 'default' in schema) {
      createTypeFn = (input) =>
        v.pipe(
          v.optional(input, schema.default) as any,
          ...actionList,
          ...configList,
        );
    } else if (types[1] === 'null') {
      createTypeFn = (input) =>
        v.pipe(v.nullable(input) as any, ...actionList, ...configList);
    }

    // 这个是单独类型,与type互斥
    if ('const' in schema) {
      return createTypeFn(
        v.optional(v.literal(schema.const as any), schema.const),
      );
    } else if (this.isEnum(schema)) {
      const enumOptions = this.toEnumOptions(schema);
      let baseSchema = v.picklist(enumOptions.map((item) => item.value));

      if (type === 'array') {
        return createTypeFn(
          v.pipe(
            v.array(baseSchema),
            asControl(),
            setComponent('multiselect'),
            patchInputs({
              options: enumOptions,
            }),
          ),
        );
      } else {
        return createTypeFn(
          v.pipe(
            baseSchema,
            patchInputs({
              options: enumOptions,
            }),
          ),
        );
      }
    } else if (schema.oneOf) {
      return createTypeFn(
        this.logicGroupSchema(<JSONSchema7[]>schema.oneOf, 'oneOf', options),
      );
    } else if (schema.anyOf) {
      return createTypeFn(
        this.logicGroupSchema(<JSONSchema7[]>schema.anyOf, 'anyOf', options),
      );
    } else {
      switch (type) {
        case 'number':
        case 'integer': {
          return createTypeFn(v.number());
        }
        case 'boolean': {
          return createTypeFn(v.boolean());
        }
        case 'string': {
          return createTypeFn(v.string());
        }
        case 'null': {
          return createTypeFn(v.optional(v.null(), null));
        }
        case 'object': {
          let parent;

          let childrenMap = new Map<string, any>();
          let addonList: any[] = [];
          let checkUnion = false;
          const { propDeps, schemaDeps } = this.resolveDependencies(schema);
          for (const property of Object.keys(schema.properties || {})) {
            if (options.unionKey === property) {
              checkUnion = true;
              continue;
            }
            const isRequired =
              Array.isArray(schema.required) &&
              schema.required.indexOf(property) !== -1;
            // 子级
            const child = this.__toValibotWrapper(
              <JSONSchema7>schema.properties![property],
              { ...options, unionKey: undefined },
            );
            // 添加子级
            if (!isRequired && child.type !== 'optional') {
              childrenMap.set(property, v.optional(child));
            } else {
              childrenMap.set(property, child);
            }

            if (schemaDeps[property]) {
              let depSchema = schemaDeps[property];
              let haskey = this.#hasSelfKey(depSchema, property);
              if (haskey) {
                console.log(this.isEnum((depSchema as any).oneOf![0]));
              }
              let instance = this.__toValibotWrapper(depSchema, {
                ...options,
                unionKey: haskey ? property : undefined,
              });
              addonList.push(
                v.pipe(
                  instance.type === 'optional'
                    ? instance
                    : v.optional(instance),
                  hideWhen({
                    disabled: true,
                    listen: (fn, field) => {
                      let queryField = field.get(['..', 0, property])!;
                      return queryField.form.control!.valueChanges.pipe(
                        map((value) => {
                          return (
                            queryField.form.control!.status$$() !== 'VALID' ||
                            value === undefined
                          );
                        }),
                      );
                    },
                  }),
                ),

                //todo 条件式必选
              );
            }
          }
          if (!childrenMap.size) {
            return undefined;
          }
          let baseSchema = v.object(
            [...childrenMap.entries()].reduce(
              (obj, [key, value]) => {
                obj[key] = value;
                return obj;
              },
              {} as Record<any, any>,
            ),
          );
          if (addonList.length) {
            // 因为交叉类型问题,使用一个临时兼容
            parent = v.fallback(
              v.intersect([baseSchema, ...addonList]),
              (a) => a,
            );
          } else {
            parent = baseSchema;
          }
          if (checkUnion) {
            let constValue = this.toEnumOptions(
              schema.properties![options.unionKey!] as any,
            ).map((item) => item.value);
            parent = v.pipe(
              parent,
              hideWhen({
                disabled: true,
                listen: (fn, field) => {
                  return field
                    .get(['..', '..', 0, options.unionKey!])!
                    .form.control!.valueChanges.pipe(
                      map((item) => {
                        return constValue.every((cv) => cv !== item);
                      }),
                    );
                },
              }),
            );
          }

          return createTypeFn(parent) as any;
        }
        case 'array': {
          let parent;
          // 解析子级
          // resolve items schema needed for isEnum check
          if (schema.items) {
            if (!Array.isArray(schema.items)) {
              schema.items = this.resolveSchema(
                <JSONSchema7>schema.items,
                options,
              );
            } else {
              schema.items = schema.items.map((item) =>
                this.resolveSchema(<JSONSchema7>item, options),
              );
            }
          }

          // TODO: remove isEnum check once adding an option to skip extension
          if (!this.isEnum(schema)) {
            if (Array.isArray(schema.items)) {
              // 元组
              parent = v.tuple(
                schema.items.map((item, index) =>
                  this.__toValibotWrapper(item as any, options),
                ),
              );
            } else {
              parent = v.lazy(() =>
                v.array(this.__toValibotWrapper(schema.items as any, options)),
              );
            }
            return createTypeFn(parent);
          }
          break;
        }
        default:
          throw new Error(`未知类型:${type}`);
      }
    }
    throw new Error('');
  }

  private resolveSchema(schema: JSONSchema7, options: IOptions): JSONSchema7 {
    if (schema && schema.$ref) {
      schema = this.resolveDefinition(schema, options);
    }

    if (schema && schema.allOf) {
      schema = this.resolveAllOf(schema, options);
    }

    return schema;
  }

  private resolveAllOf(
    { allOf, ...baseSchema }: FormlyJSONSchema7,
    options: IOptions,
  ) {
    if (!allOf!.length) {
      throw Error(`allOf array can not be empty ${allOf}.`);
    }

    return (allOf as FormlyJSONSchema7[]).reduce(
      (base: FormlyJSONSchema7, schema: FormlyJSONSchema7) => {
        schema = this.resolveSchema(schema, options);
        if (base.required && schema.required) {
          base.required = [...base.required, ...schema.required];
        }

        if (schema.uniqueItems) {
          base.uniqueItems = schema.uniqueItems;
        }

        // resolve to min value
        (
          [
            'maxLength',
            'maximum',
            'exclusiveMaximum',
            'maxItems',
            'maxProperties',
          ] as (keyof FormlyJSONSchema7)[]
        ).forEach((prop) => {
          if (!isEmpty(base[prop]) && !isEmpty(schema[prop])) {
            (base as any)[prop] =
              base[prop]! < schema[prop]! ? base[prop] : schema[prop];
          }
        });

        // resolve to max value
        (
          [
            'minLength',
            'minimum',
            'exclusiveMinimum',
            'minItems',
            'minProperties',
          ] as (keyof FormlyJSONSchema7)[]
        ).forEach((prop) => {
          if (!isEmpty(base[prop]) && !isEmpty(schema[prop])) {
            (base as any)[prop] =
              base[prop]! > schema[prop]! ? base[prop] : schema[prop];
          }
        });

        return reverseDeepMerge(base, schema);
      },
      baseSchema,
    );
  }

  private logicGroupSchema(
    schemas: JSONSchema7[],
    type: 'oneOf' | 'anyOf',
    options: IOptions,
  ) {
    let children = schemas
      .map((s, i) => this.__toValibotWrapper(s, options))
      .filter(Boolean);
    let baseSchema = v.pipe(
      type === 'oneOf' ? v.union(children) : v.intersect(children),
      setComponent('logic-group'),
    );
    return options.unionKey
      ? baseSchema
      : v.pipe(baseSchema, patchProps({ type }));
  }

  private resolveDefinition(
    schema: FormlyJSONSchema7,
    options: IOptions,
  ): FormlyJSONSchema7 {
    const [uri, pointer] = schema.$ref!.split('#/');
    if (uri) {
      throw Error(`Remote schemas for ${schema.$ref} not supported yet.`);
    }

    const definition = !pointer
      ? null
      : pointer
          .split('/')
          .reduce(
            (def, path) =>
              def?.hasOwnProperty(path) ? (def as any)[path] : null,
            options.schema,
          );

    if (!definition) {
      throw Error(`Cannot find a definition for ${schema.$ref}.`);
    }

    if (definition.$ref) {
      return this.resolveDefinition(definition, options);
    }

    return {
      ...definition,
      ...['title', 'description', 'default', 'actions'].reduce(
        (annotation, p) => {
          if (schema.hasOwnProperty(p)) {
            annotation[p] = (schema as any)[p];
          }

          return annotation;
        },
        {} as any,
      ),
    };
  }

  private resolveDependencies(schema: JSONSchema7) {
    const propDeps: { [id: string]: string[] } = {};
    const schemaDeps: { [id: string]: JSONSchema7 } = {};

    Object.keys(schema.dependencies || {}).forEach((prop) => {
      const dependency = schema.dependencies![prop] as JSONSchema7;
      if (Array.isArray(dependency)) {
        // Property dependencies
        dependency.forEach((dep) => {
          if (!propDeps[dep]) {
            propDeps[dep] = [prop];
          } else {
            propDeps[dep].push(prop);
          }
        });
      } else {
        // schema dependencies
        schemaDeps[prop] = dependency;
      }
    });

    return { propDeps, schemaDeps };
  }

  private guessSchemaType(schema: JSONSchema7) {
    const type = schema?.type;
    if (!type && schema?.properties) {
      return ['object'];
    }

    if (Array.isArray(type)) {
      if (type.length === 1) {
        return type;
      }

      if (type.length === 2 && type.indexOf('null') !== -1) {
        return type.sort((t1) => (t1 == 'null' ? 1 : -1));
      }

      return type;
    }

    return type ? [type] : [];
  }

  /** 数组是否是枚举 */
  private isEnum(schema: JSONSchema7): boolean {
    return (
      !!schema.enum ||
      (!!schema.anyOf && (schema.anyOf as JSONSchema7[]).every(isConst)) ||
      (!!schema.oneOf && (schema.oneOf as JSONSchema7[]).every(isConst)) ||
      (!!schema.uniqueItems &&
        !!schema.items &&
        !Array.isArray(schema.items) &&
        this.isEnum(<JSONSchema7>schema.items))
    );
  }

  private toEnumOptions(schema: JSONSchema7): { value: any; label: any }[] {
    if (schema.enum) {
      return schema.enum.map((value) => ({ value, label: value }));
    }

    const toEnum = (s: JSONSchema7) => {
      const value = s.hasOwnProperty('const') ? s.const : s.enum![0];
      const option: any = { value, label: s.title || value };
      if (s.readOnly) {
        option.disabled = true;
      }

      return option;
    };

    if (schema.anyOf) {
      return (schema.anyOf as JSONSchema7[]).map(toEnum);
    }

    if (schema.oneOf) {
      return (schema.oneOf as JSONSchema7[]).map(toEnum);
    }

    return this.toEnumOptions(<JSONSchema7>schema.items);
  }
  #hasSelfKey(schema: JSONSchema7, property: string) {
    let list = schema.oneOf ?? [];
    if (!list.length) {
      return false;
    }
    return list.every(
      (item) =>
        item &&
        typeof item === 'object' &&
        item['properties'] &&
        property in item['properties'],
    );
  }
}
