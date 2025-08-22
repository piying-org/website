# Action

- 基于typeorm的[EntitySchema](https://typeorm.io/docs/entity/separating-entity-definition/#extending-schemas)封装,与装饰器基本相同,但是会有一些差别
- 使用`EntitySchema`实现会有部分逻辑无法实现(@Tree),这是由于typeorm两部分代码(EntitySchema,装饰器)可能没有同步更新导致
  > 已经提交[PR](https://github.com/typeorm/typeorm/pull/11606)

## entity

- [@Entity](https://typeorm.io/docs/entity/entities#what-is-an-entity)
- 此方法可以省略,省略时使用注册的key

```typescript
const define = v.pipe(
  v.object({
    id: v.pipe(v.string(), columnPrimaryKey({ primary: true, generated: "uuid" })),
    name: StrColumn,
    vc: v.pipe(v.string(), noColumn()),
  }),
  entity({
    tableName: "tableTest",
    name: "test",
  }),
);
const { object, dataSource } = await createInstance({ tableTest: define });
```

## column

- [@Column](https://typeorm.io/docs/help/decorator-reference/#column-decorators)

## 自动生成属性(可以覆盖)

- `comment` 根据`v.title`,`v.description`自动生成
- `type` 一些基础类型可自动赋值
- `nullable` 字段处于非必填状态时
- `default` 可选的默认值
- `enum` picklist的值
- `array` 使用`v.array()`时为true

### 其他列装饰器实现

#### [@CreateDateColumn](https://typeorm.io/docs/help/decorator-reference/#createdatecolumn)

- `column({ createDate: true })`

#### [@UpdateDateColumn](https://typeorm.io/docs/help/decorator-reference/#updatedatecolumn)

- `column({ updateDate: true })`

#### [@DeleteDateColumn](https://typeorm.io/docs/help/decorator-reference/#deletedatecolumn)

- `column({ deleteDate: true })`

#### [@VersionColumn](https://typeorm.io/docs/help/decorator-reference/#versioncolumn)

- `column({ version: true })`

#### [@Generated](https://typeorm.io/docs/help/decorator-reference/#generated)

- `column({ generated: 'uuid' })`

## columnPrimaryKey

- [@PrimaryColumn](https://typeorm.io/docs/help/decorator-reference/#primarycolumn)
- [@PrimaryGeneratedColumn](https://typeorm.io/docs/help/decorator-reference/#primarygeneratedcolumn)
- 此方法仅用力标记主键,可以用`column`进行其他参数修改

```typescript
v.pipe(
  v.object({
    id: v.pipe(v.string(), columnPrimaryKey({ primary: true, generated: "uuid" })),
  }),
);
```

## columnObjectId

- [@ObjectIdColumn](https://typeorm.io/docs/help/decorator-reference/#objectidcolumn)

```typescript
v.pipe(
  v.object({
    _id: v.pipe(v.string(), columnObjectId()),
  }),
);
```

## columnVirtual

- [@VirtualColumn](https://typeorm.io/docs/help/decorator-reference/#virtualcolumn)

```typescript
v.pipe(
  v.object({
    id: v.pipe(v.string(), columnPrimaryKey({ primary: true, generated: "uuid" })),
    k1: v.number(),
    vk1: v.pipe(
      v.number(),
      columnVirtual({
        query: (alias) => `SELECT k1 FROM "tableTest" WHERE "k1" = ${alias}."k1"`,
      }),
    ),
  }),
);
```

---

## oneToOne

- [@OneToOne](https://typeorm.io/docs/help/decorator-reference/#onetoone)

```typescript
const define1 = v.pipe(
  v.object({
    id: v.pipe(v.string(), columnPrimaryKey({ primary: true, generated: "uuid" })),
    ref2: v.pipe(
      v.lazy(() => define2),
      oneToOne({ joinColumn: true, target: () => define2 }),
    ),
  }),
);
const define2 = v.pipe(
  v.object({
    id: v.pipe(v.string(), columnPrimaryKey({ primary: true, generated: "uuid" })),
    define2Value: v.pipe(v.string(), column()),
  }),
);
```

## manyToOne

- [@ManyToOne](https://typeorm.io/docs/help/decorator-reference/#manytoone)

```typescript
const define1 = v.pipe(
  v.object({
    id: v.pipe(v.string(), columnPrimaryKey({ primary: true, generated: "uuid" })),
    ref2: v.pipe(
      v.lazy(() => define2),
      manyToOne({ joinColumn: true, target: () => define2 }),
    ),
  }),
);
const define2 = v.pipe(
  v.object({
    id: v.pipe(v.string(), columnPrimaryKey({ primary: true, generated: "uuid" })),
    define2Value: v.pipe(v.string(), column()),
  }),
);
```

## oneToMany

- [@OneToMany](https://typeorm.io/docs/help/decorator-reference/#onetomany)
- 双向关联时因为循环引用的关系,需要将循环部分的类型和定义单独声明,然后使用`intersect`

```typescript
type Lazy = v.GenericSchema<{ user: v.InferInput<typeof UserEntity> }, { user: v.InferOutput<typeof UserEntity> }>;

const PhotoCommon = v.pipe(
  v.object({
    id: v.pipe(v.number(), columnPrimaryKey({ primary: true, generated: true })),
    url: v.pipe(v.string(), column()),
  }),
);
const PhotoLazy: Lazy = v.object({
  user: v.pipe(
    v.lazy(() => UserEntity),
    manyToOne({ target: () => UserEntity, inverseSide: "photos" }),
  ),
});
const PhotoEntity = v.pipe(v.intersect([PhotoCommon, PhotoLazy]));
const UserEntity = v.pipe(
  v.object({
    id: v.pipe(v.number(), columnPrimaryKey({ primary: true, generated: true })),
    name: v.pipe(v.string(), column()),
    photos: v.pipe(
      v.lazy(() => v.array(PhotoEntity)),
      oneToMany({ target: () => PhotoEntity, inverseSide: "user" }),
    ),
  }),
);
```

## manyToMany

- [@ManyToMany](https://typeorm.io/docs/help/decorator-reference/#manytomany)

```typescript
const Category = v.pipe(
  v.object({
    id: v.pipe(v.number(), columnPrimaryKey({ generated: true })),
    name: v.pipe(v.string(), column()),
  }),
);
const Question = v.pipe(
  v.object({
    id: v.pipe(v.number(), columnPrimaryKey({ generated: true })),
    title: v.pipe(v.string(), column()),
    text: v.pipe(v.string(), column()),
    categories: v.pipe(
      v.lazy(() => v.array(Category)),
      manyToMany({ target: () => Category, joinTable: true }),
    ),
  }),
);
```

## columnRelationId

- [@RelationId](https://typeorm.io/docs/help/decorator-reference/#relationid)

```typescript
const define1 = v.pipe(
  v.object({
    id: v.pipe(v.string(), columnPrimaryKey({ primary: true, generated: "uuid" })),
    ref2: v.pipe(
      v.lazy(() => define2),
      oneToOne({ joinColumn: { name: "ref2Idm" }, target: () => define2 }),
    ),
    ref2Idm: v.pipe(v.string(), columnRelationId({ relationName: "ref2" })),
  }),
);
const define2 = v.pipe(
  v.object({
    id: v.pipe(v.string(), columnPrimaryKey({ primary: true, generated: "uuid" })),
    define2Value: StrColumn,
  }),
);
```

## columnIndex

- [@Index](https://typeorm.io/docs/help/decorator-reference/#index)

```typescript
columnIndex();
```

## entityUnique

- [@Unique](https://typeorm.io/docs/help/decorator-reference/#unique)

```typescript
entityUnique([{ columns: ["name"] }]);
```

## entityCheck

- [@Check](https://typeorm.io/docs/help/decorator-reference/#check)

```typescript
v.pipe(
  v.object({
    id: IDSchema,
    age: v.number(),
  }),
  entityCheck({ expression: '"age" > 18' }),
);
```

## entityExclusion

- [@Exclusion](https://typeorm.io/docs/help/decorator-reference/#exclusion)

```typescript
entityExclusion({
  expression: `USING gist ("room" WITH =, tsrange("from", "to") WITH &&)`,
});
```

## entityForeignKey

- [@ForeignKey](https://typeorm.io/docs/help/decorator-reference/#foreignkey)

```typescript
const City = v.pipe(
  v.object({
    id: v.pipe(v.string(), columnPrimaryKey({ primary: true, generated: "uuid" })),
    countryCode: v.string(),
    name: v.string(),
  }),
  entityForeignKey([
    {
      target: () => Country,
      columnNames: ["countryCode"],
      referencedColumnNames: ["id"],
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  ]),
);
const Country = v.pipe(
  v.object({
    id: v.pipe(v.string(), columnPrimaryKey({ primary: true, generated: "uuid" })),
    name: v.string(),
  }),
);
```

## viewEntity

- [@ViewEntity()](https://typeorm.io/docs/entity/view-entities)

```typescript
const Category = v.pipe(
  v.intersect([
    ID,
    v.object({
      name: StrColumn,
    }),
  ]),
  entity({
    tableName: "Category",
    name: "Category",
  }),
);
const Post = v.pipe(
  v.intersect([
    ID,
    v.object({
      name: StrColumn,
      categoryId: v.string(),
      category: v.pipe(
        v.lazy(() => Category),
        manyToOne({
          target: () => Category,
          joinColumn: { name: "categoryId" },
        }),
      ),
    }),
  ]),
  entity({
    tableName: "Post",
    name: "Post",
  }),
);
const PostCategory = v.pipe(
  v.intersect([
    ID,
    v.object({
      name: StrColumn,
      categoryName: StrColumn,
    }),
  ]),
  viewEntity({
    tableName: "PostCategory",
    name: "PostCategory",
    expression: (dataSource, instance) => dataSource.createQueryBuilder().select("post.id", "id").addSelect("post.name", "name").addSelect("category.name", "categoryName").from(instance.getEntity(Post), "post").leftJoin(instance.getEntity(Category), "category", "category.id = post.categoryId"),
  }),
);
const { object, dataSource } = await createInstance({
  Category,
  Post,
  PostCategory,
});
```

## 其他装饰器对应

- [@JoinColumn](https://typeorm.io/docs/help/decorator-reference/#joincolumn)

```typescript
manyToOne({ joinColumn: true });
oneToOne({ joinColumn: true });
```

- [@JoinTable](https://typeorm.io/docs/help/decorator-reference/#jointable)

```typescript
manyToMany({ joinTable: true });
```

## 其他概念对应

### [Embedded Entities](https://typeorm.io/docs/entity/embedded-entities)

- 默认会自动处理关系,也可以增加column Action进行调整

```typescript
const define = v.pipe(
  v.object({
    id: IDSchema,
    o1: v.object({
      o2: v.object({
        k1: v.string(),
      }),
    }),
  }),
);
```

### [Tree Entities](https://typeorm.io/docs/entity/tree-entities)

- 因为EntitySchema不支持`trees`字段,所以`@Tree`不被支持

```typescript
type Lazy = v.GenericSchema<
  {
    parent: v.InferInput<typeof Category>;
    children: v.InferInput<typeof Category>[];
  },
  {
    parent: v.InferOutput<typeof Category>;
    children: v.InferOutput<typeof Category>[];
  }
>;
const CategoryLazy: Lazy = v.pipe(
  v.object({
    parent: v.pipe(
      v.lazy(() => Category),
      manyToOne({ target: () => Category, inverseSide: "children" }),
    ),
    children: v.pipe(
      v.lazy(() => v.array(Category)),
      oneToMany({ target: () => Category, inverseSide: "parent" }),
    ),
  }),
);
const CategoryCommon = v.pipe(
  v.object({
    id: IDSchema,
    name: StrColumn,
    description: StrColumn,
  }),
);
const Category = v.pipe(
  v.intersect([CategoryLazy, CategoryCommon]),
  entity({
    tableName: "Category",
    name: "Category",
  }),
);

const { object, dataSource } = await createInstance({ Category });
```
