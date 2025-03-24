import * as bcrypt from 'bcryptjs';


export class PasswordHelper {
  private static readonly saltRounds = 10;

  /**
   * 加密密码
   * @param password 原始密码
   * @returns 加密后的密码
   */
  static async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, this.saltRounds);
    } catch (error) {
      console.error('密码加密失败:', error);
      throw new Error('密码加密失败');
    }
  }

  /**
   * 校验密码
   * @param password 原始密码
   * @param hashedPassword 数据库中已加密密码
   * @returns 是否匹配
   */
  static async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      console.error('密码校验失败:', error);
      throw new Error('密码校验失败');
    }
  }
}
