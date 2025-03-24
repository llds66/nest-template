<blockquote align="center">
<p><br><strong>nest-template</strong><br><a href="https://apifox.com/apidoc/shared-0b3d30a8-c14b-450a-a4d2-d2567da3a7c6"><strong>Apifox -></strong></a></p>
</blockquote>

## 项目设置

```bash
# install dependencies
$ pnpm install

# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## CLI 命令

```bash
# generate module
$ nest g module name

# generate controller
$ nest g controller name

# generate service
$ nest g service name
```

## 配置

```typescript
// jwt 配置 config/jwt.config.ts
import { JwtModuleOptions } from '@nestjs/jwt';

export class JwtConfig {
  static readonly secret = ''; // 密钥

  static getJwtOptions(): JwtModuleOptions {
    return {
      secret: JwtConfig.secret,
      signOptions: {
        expiresIn: '1d', // 过期时间
        algorithm: 'HS256', // 加密算法
      },
    };
  }
}
```

```typescript
// 数据库配置 config/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: '',
  password: '',
  database: '',
  entities: [],
  synchronize: true,
};
```
