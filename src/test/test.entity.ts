import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('table_1')
// 默认使用类名的小写形式作为表名
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;
}
