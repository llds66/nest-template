import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './login.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from '../config/jwt.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register(JwtConfig.getJwtOptions()),
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
