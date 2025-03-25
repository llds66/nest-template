import { Module } from '@nestjs/common';
import { TestModule } from './test/test.module';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

/**
 * 模块是具有 @Module() 装饰器的类
 *
 * 数据库TypeORM连接：TypeOrmModule.forRoot用于全局配置 TypeORM 连接,能在 AppModule 或根模块中调用一次
 * */
@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TestModule, LoginModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  //   中间件
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(ResponseMiddleware).forRoutes('*');
  // }
}
