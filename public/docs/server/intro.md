# ORM介绍

- 通过添加元数据支持,使得Orm定义与类型定义合二为一,方便管理
- 适用于Orm场景

## 当前支持

- typeorm

> 更多支持待实现

## 使用展示

- 通过指定元数据定义,使得类型安全定义可以被解析并被orm使用

```typescript
const define = v.pipe(
  v.object({
    id: v.pipe(v.string(), columnPrimaryKey({ primary: true, generated: "uuid" })),
    str1: StrColumn,
    num1: v.pipe(v.number(), column()),
    bool1: v.pipe(v.boolean(), column()),
  }),
  entity({
    tableName: "tableTest",
    name: "test",
  }),
);
```

- 支持自动解析嵌套定义,转换为表定义

```typescript
const define = v.pipe(
  v.object({
    id: IDSchema,
    o1: v.object({
      k1: v.string(),
    }),
  }),
);
```

- 树实体定义引用

```typescript
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
```

- 外键引用

```typescript
const City = v.pipe(
  v.object({
    id: v.pipe(v.string(), columnPrimaryKey({ primary: true, generated: "uuid" })),
    countryCode: v.pipe(
      StrColumn,
      columnForeignKey({
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        target: () => Country,
      }),
    ),
    name: StrColumn,
  }),
);
```

## 源码
- https://github.com/piying-org/piying-orm