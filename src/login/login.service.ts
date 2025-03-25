import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './login.entity';
import { Repository } from 'typeorm';
import { UserType } from './login.dto';
import { PasswordHelper } from '../utils/password.helper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  //   登录
  async login(body: UserType): Promise<object> {
    const { account, password } = body;
    const res: User | null = await this.userRepository.findOneBy({ account });
    const user_id = res?.id;
    if (res !== null) {
      const isMatch = await PasswordHelper.comparePassword(
        password,
        res.password,
      );
      if (isMatch) {
        const token = this.jwtService.sign({ id: user_id, account });
        return {
          code: 200,
          message: '登录成功',
          token: `Bearer ${token}`,
        };
      }
      return {
        code: 201,
        message: '密码错误',
      };
    }
    return {
      code: 200,
      message: ' 用户不存在',
    };
  }

  //   注册
  async reg(body: UserType): Promise<object> {
    const { account, password } = body;
    const res = await this.userRepository.findOneBy({ account });
    if (res === null) {
      const hash = await PasswordHelper.hashPassword(password);
      const res = await this.userRepository.insert({ account, password: hash });
      if (res.identifiers.length > 0) {
        return {
          code: 200,
          message: '注册成功',
        };
      } else {
        return {
          code: 201,
          message: '注册失败',
        };
      }
    }
    return {
      code: 201,
      message: '用户名已存在',
    };
  }
}
