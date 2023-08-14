import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
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
  name: string;

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
  @ManyToOne(() => BlogTag, tag => tag.article)
  tagId?: BlogTag;

  // 阅读量
  @Column("tinyint")
  views: number;

  // 点赞
  @Column("tinyint")
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

}