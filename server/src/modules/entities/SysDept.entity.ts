import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { SysUser } from './SysUser.entity';

@Entity('sys_dept')
export class SysDept {
  // 主键
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: number;

  // 部门名称
  @Column("varchar", {
    length: 64,
  })
  name: string;

  // 父节点id
  @ManyToOne(() => SysDept, dept => dept.parentIds)
  @JoinColumn({
    name: "parent_id",
  })
  parentId: SysDept;

  @OneToMany(() => SysDept, dept => dept.parentId)
  parentIds: SysDept[];

  // 父节点id路径
  @Column("varchar", {
    name: "tree_path",
    length: 255,
    nullable: true,
  })
  treePath: string;

  // 显示顺序
  @Column("int", { nullable: true, })
  sort: number;

  // 状态
  @Column("tinyint")
  status: number;

  // 逻辑删除标识
  @Column("tinyint", { nullable: true, })
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

  
}