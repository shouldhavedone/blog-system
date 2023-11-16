import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
ManyToMany,
JoinTable,
} from 'typeorm';
import { BlogTag } from './BlogTag.entity';

@Entity('blog_article')
export class BlogArticle {
  // 主键
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: number;

  // 标题
  @Column("varchar", {
    length: 128,
  })
  title: string;

  // 描述
  @Column("varchar", {
    length: 255,
  })
  desc: string;

  // 作者
  @Column({
    type: 'int',
  })
  author: number;

  // 标签ID
  @ManyToMany(() => BlogTag, tag => tag.articles)
  @JoinTable()
  tags: BlogTag[];

  // 阅读量
  @Column("tinyint", { nullable: true, })
  views: number;

  // 点赞
  @Column("tinyint", { nullable: true, })
  likes: number;

  // 标题图片
  @Column("varchar", {
    length: 255,
    name: "img_url"
  })
  imgUrl: string;

  // 内容
  @Column("text")
  content: string;

  // 状态 0:草稿 1:发布 2:撤回
  @Column("tinyint")
  status: number;

  // 逻辑删除标识
  @Column("tinyint", { nullable: true, })
  deleted: number;

  // 创建时间
  @Column({
    name: "create_time",
    nullable: true,
  })
  createTime?: string;

  // 更新时间
  @Column({
    name: "update_time",
    nullable: true,
  })
  updateTime?: string;

}