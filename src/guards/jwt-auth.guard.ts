import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtConfig } from '../config/jwt.config';

/**
 * JWT 认证守卫
 * 使用 @Injectable() 装饰器的类。 守卫应该实现 CanActivate 接口。
 * 守卫在每个中间件之后执行，但在任何拦截器或管道之前执行。
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  /**
   * 验证用户是否有Token
   * 拦截请求并从 Authorization 头中提取JWT令牌。
   * 如果没有找到令牌，则会抛出 自定义的错误响应，阻止访问该路由。
   * @param context
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      // 自定义的错误响应
      throw new HttpException(
        { code: 2, message: '认证失败' },
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      const payload: any = await this.jwtService.verifyAsync(token, {
        secret: JwtConfig.secret,
      });
      // 💡 在这里我们将 payload 挂载到请求对象上
      // 以便我们可以在路由处理器中访问它
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
