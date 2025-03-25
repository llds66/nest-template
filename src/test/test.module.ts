import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './test.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from '../config/jwt.config';

/**
 * TypeORM：TypeOrmModule.forFeature用于在特定模块中注册实体,只能在局部模块（如 UserModule）中使用
 * */
@Module({
  imports: [
    TypeOrmModule.forFeature([Test]),
    JwtModule.register(JwtConfig.getJwtOptions()),
  ],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
