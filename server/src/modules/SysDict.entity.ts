import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('sys_dict')
export class SysDict {
  // 主键
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: number;

  // 字典类型编码
  @Column("varchar", {
    length: 64,
    name: "type_code"
  })
  typeCode: string;

  // 字典项名称
  @Column("varchar", {
    length: 50,
  })
  name: string;

  // 字典项值
  @Column("varchar", {
    length: 50,
  })
  value: string;

  // 显示顺序
  @Column("int", { nullable: true, })
  sort: number;

  // 状态
  @Column("tinyint")
  status: number;

  // 是否默认(1:是;0:否)
  @Column("tinyint", { nullable: true, })
  defaulted: number;

  // 备注
  @Column("varchar", {
    length: 255,
    nullable: true,
  })
  remark: string;

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
}