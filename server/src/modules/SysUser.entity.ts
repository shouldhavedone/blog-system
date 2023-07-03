import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { SysDept } from './SysDept.entity';
import { SysRole } from './SysRole.entity';

@Entity('sys_user')
export class SysUser {
  // 主键
  @PrimaryGeneratedColumn()
  id: number;

  // 用户名
  @Column("varchar", {
    length: 64,
    nullable: true,
  })
  username: string;

  // 昵称
  @Column("varchar", {
    length: 64,
    nullable: true,
  })
  nickname: string;

  // 性别
  @Column("tinyint", {
    nullable: true,
  })
  gender: number;

  // 密码
  @Column("varchar", {
    length: 100,
    nullable: true,
  })
  password: string;

  // 部门ID
  @ManyToOne(() => SysDept, dept => dept.users)
  dept?: SysDept;

  // 用户头像
  @Column("varchar", {
    length: 255,
    nullable: true,
  })
  avatar: string;

  // 联系方式
  @Column("varchar", {
    length: 20,
    nullable: true,
  })
  mobile: string;

  // 用户状态
  @Column("tinyint", {
    nullable: true,
  })
  status: number;

  // 用户邮箱
  @Column("varchar", {
    length: 128,
    nullable: true,
  })
  email: string;

  // 逻辑删除标识
  @Column("tinyint", {
    nullable: true,
  })
  deleted: number;

  // 创建时间
  @Column({
    name: "create_time",
    type: "datetime",
    nullable: true,
  })
  createTime?: Date;

  // 更新时间
  @Column({
    name: "update_time",
    type: "datetime",
    nullable: true,
  })
  updateTime?: Date;

  @OneToMany(() => SysDept, dept => dept.createBy)
  deptCreates: SysDept[];

  @OneToMany(() => SysDept, dept => dept.updateBy)
  deptUpdates: SysDept[];

  
  @ManyToMany(() => SysRole, role => role.users)
  @JoinTable()
  roles: SysRole[];
}