import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  JoinColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

import { SysUser } from './SysUser.entity';
import { SysRole } from './SysRole.entity'

@Entity('sys_menu')
export class SysMenu {
  // 主键
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: number;


  // 父节点id
  @ManyToOne(() => SysMenu, menu => menu.parentIds)
  @JoinColumn({
    name: "parent_id",
  })
  parentId: SysMenu;

  @OneToMany(() => SysMenu, menu => menu.parentId)
  parentIds: SysMenu[];

  // 父节点id路径
  @Column("varchar", {
    name: "tree_path",
    length: 255,
    nullable: true,
  })
  treePath: string;

  // 菜单名称
  @Column("varchar", {
    length: 64,
  })
  name: string;

  // 菜单类型
  @Column("tinyint")
  type: number;

  // 路由路径
  @Column("varchar", {
    length: 128,
    nullable: true,
  })
  path: string;

  // 组件路径
  @Column("varchar", {
    length: 128,
    nullable: true,
  })
  component: string;

  // 权限标识
  @Column("varchar", {
    length: 128,
    nullable: true,
  })
  perm: string;

  // 顺序
  @Column("int", { nullable: true, })
  sort: number;

  // 显示状态
  @Column("tinyint")
  visible: number;

  // 菜单图标
  @Column("varchar", {
    nullable: true,
    length: 64
  })
  icon: string;

  // 跳转路径
  @Column("varchar", {
    nullable: true,
    length: 128,
  })
  redirect: string;

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

  // 创建人ID
  @ManyToOne(() => SysUser, user => user.deptCreates)
  @JoinColumn({
    name: "create_by",
  })
  createBy: SysUser;

  // 修改人ID
  @ManyToOne(() => SysUser, user => user.deptUpdates)
  @JoinColumn({
    name: "update_by",
  })
  updateBy: SysUser;

  @OneToMany(() => SysUser, user => user.dept)
  users: SysUser[];

  @ManyToMany(() => SysRole, role => role.menus)
  @JoinTable()
  roles: SysRole[];
}