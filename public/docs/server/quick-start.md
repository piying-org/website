# 快速开始

## 安装

- `npm i valibot`
- `npm i @piying/orm`

## 使用

- 皮影目前仅实现了`typeorm`的兼容

```typescript
import { convert, column, columnPrimaryKey } from "@piying/orm/typeorm";
import * as v from 'valibot';
export const Account = v.pipe(
  v.object({
    id: v.pipe(v.string(), columnPrimaryKey({ generated: "uuid" })),
    createdAt: v.pipe(v.date(), column({ createDate: true })),
    updateAt: v.pipe(v.date(), column({ updateDate: true })),
    username: v.pipe(v.string(), v.title("用户名"), column({ length: 50 })),
  }),
);
const instance = convert(
  {
    Account,
  },
  {
    dataSourceOptions: {
      type: "better-sqlite3",
      database: path.join(process.cwd(), ".tmp", "data.sqlite"),
      synchronize: false,
      logging: true,
    },
  },
);
await instance.dataSource.initialize();
result.object.Account;
```

- 通过`convert`导出`dataSource`实例与注册`实体`
- 之后的使用与typeorm完全相同,也就是由之前的装饰器声明改为现在的`valibot`定义声明
