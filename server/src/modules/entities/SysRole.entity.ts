import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
} from 'typeorm';


import { SysMenu } from './SysMenu.entity'
import { SysUser } from './SysUser.entity';

@Entity('sys_role')
export class SysRole {
  // 主键
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: number;

  // 角色名称
  @Column("varchar", {
    length: 64,
  })
  name: string;

  // 角色编码
  @Column("varchar", {
    length: 32,
  })
  code: string;

  // 显示顺序
  @Column("int", { nullable: true, })
  sort: number;

  // 显示状态
  @Column("tinyint")
  status: number;

  // 显示状态
  @Column("tinyint", { name: 'data_scope' })
  dataScope: number;

  // 显示状态
  @Column("tinyint")
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
    nullable: true,
    type: "datetime"
  })
  updateTime?: Date;


  @ManyToMany(() => SysMenu, menu => menu.roles)
  menus: SysMenu[];

  @ManyToMany(() => SysUser, user => user.roles)
  users: SysUser[];
}