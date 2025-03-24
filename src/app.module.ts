import { Module } from '@nestjs/common';
import { TestModule } from './test/test.module';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

/**
 * 模块是具有 @Module() 装饰器的类
 * */
@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TestModule, LoginModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
