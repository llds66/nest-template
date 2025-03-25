import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * 格式化响应
 * code: 0 成功，1 异常，2 身份验证失败
 *
 * 中间件  @Injectable() 装饰器的类中实现自定义 Nest中间件,实现 NestMiddleware 接口
 * */
interface ResponseData {
  code: number;
  message: string;
  data?: unknown;
}

declare module 'express' {
  interface Response {
    cc: (err: string | Error, code?: number, data?: unknown) => void;
  }
}

@Injectable()
export class ResponseMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.cc = function (err: string | Error, code: number = 1, data?: unknown) {
      const responseData: ResponseData = {
        code,
        message: err instanceof Error ? err.message : String(err),
      };
      if (data !== undefined) {
        responseData.data = data;
      }

      if (code === 0 || code === 1 || code === 2) {
        res.send(responseData);
      } else {
        res.status(code).send(responseData);
      }
    };
    next();
  }
}
