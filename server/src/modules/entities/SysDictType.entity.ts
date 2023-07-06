import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('sys_dict_type')
export class SysDictType {
  // 主键
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: number;

  // 类型名称
  @Column("varchar", {
    length: 50,
  })
  name: string;

  // 类型编码
  @Column("varchar", {
    length: 50,
  })
  code: string;

  // 状态
  @Column("tinyint")
  status: number;

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