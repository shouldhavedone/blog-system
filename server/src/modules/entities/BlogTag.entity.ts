import { BlogArticle } from './BlogArticle.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('blog_tag')
export class BlogTag {
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

  // 描述
  @Column("varchar", {
    length: 255,
  })
  desc: string;

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

  @ManyToMany(() => BlogArticle, article => article.tags)
  articles: BlogArticle[];
}