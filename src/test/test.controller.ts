import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TestService } from './test.service';
import { TestType } from './test.dto';

/**
 * 控制器 总是属于模块
 * 创建一个基本的控制器，使用类和装饰器
 * @Controller() 装饰器将类标记为控制器，并定义路由前缀
 * @Get() @Post() @Put() @Delete()等 装饰器定义了路由处理程序
 * @Req() 提供了对底层平台（默认为 Express）的请求对象（request）的访问方式
 * 开箱即用的 @Body() 或 @Query()
 * */
@Controller('auth/test')
export class TestController {
  // 被@Injectable装饰的类,可以通过 constructor 注入依赖关系
  constructor(private readonly testService: TestService) {}

  @Get()
  getTest(): object {
    return this.testService.getTest();
  }

  @Post()
  addTest(@Body() body: TestType): object {
    return this.testService.addTest(body);
  }

  @Put()
  changeTest(@Body() body: TestType): object {
    return this.testService.changeTest(body);
  }

  @Delete()
  deleteTest(@Query() query: number): object {
    return this.testService.deleteTest(Number(query['id']));
  }
}
