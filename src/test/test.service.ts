import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from './test.entity';
import { TestType } from './test.dto';

/**
 * Service服务 提供者Provider
 * Provider 只是一个用 @Injectable() 装饰器注释的类。
 * 被@Injectable装饰的类,可以通过 constructor 注入依赖关系
 * */

@Injectable()
export class TestService {
  // 通过 @InjectRepository(Test) 来注入对应的 Repository。
  constructor(
    @InjectRepository(Test)
    private userRepository: Repository<Test>,
  ) {}

  /** 查 */
  async getTest(): Promise<object> {
    // 查询所有
    const res: TestType[] = await this.userRepository.find();
    return {
      code: 200,
      message: '获取test成功',
      data: res,
    };
  }

  /** 增 */
  async addTest(body: TestType): Promise<object> {
    const res = await this.userRepository.insert(body);
    if (res.identifiers.length === 0) {
      return {
        code: 201,
        message: '添加test失败',
      };
    }
    return {
      code: 200,
      message: '添加test成功',
    };
  }

  /** 改 */
  async changeTest(body: TestType): Promise<object> {
    const { id, name, age } = body;
    const res = await this.userRepository.findOneBy({ id });
    if (res === null) {
      return {
        code: 201,
        message: '该test不存在',
      };
    } else {
      const res = await this.userRepository.update(id, { name, age });
      if (res.affected === 0) {
        return {
          code: 201,
          message: '修改test失败',
        };
      }
      return {
        code: 200,
        message: '修改test成功',
      };
    }
  }

  /** 删 */
  async deleteTest(id: number): Promise<object> {
    const res = await this.userRepository.findOneBy({ id });
    if (res === null) {
      return {
        code: 201,
        message: '该test不存在',
      };
    } else {
      const res = await this.userRepository.delete(id);
      if (res.affected === 0) {
        return {
          code: 201,
          message: '删除test失败',
        };
      }
      return {
        code: 200,
        message: '删除test成功',
      };
    }
  }
}
