import { Body, Controller, Post } from '@nestjs/common';
import { UserType } from './login.dto';
import { LoginService } from './login.service';

@Controller('common')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  // 登录
  @Post('login')
  login(@Body() body: UserType): object {
    return this.loginService.login(body);
  }

  // 注册
  @Post('reg')
  reg(@Body() body: UserType): object {
    return this.loginService.reg(body);
  }
}
