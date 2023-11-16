import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddBlogArticleDto, QueryBlogArticleDto, UpdateArticleDto } from './article.dto';
import { BlogArticle } from '../../entities/BlogArticle.entity';
import { BlogTag } from '../../entities/BlogTag.entity';

@Injectable()
export class BlogArticleService {

  constructor(
    @InjectRepository(BlogArticle)
    private sysBlogArticleRepository: Repository<BlogArticle>,
    @InjectRepository(BlogTag)
    private sysBlogTagRepository: Repository<BlogTag>
  ) { }

  /**
   * 分页列表
   * @param query 
   */
  async getListByPage(query: QueryBlogArticleDto) {
    const { pageNum, pageSize, keywords, status } = query;
    const skip = (pageNum - 1) * pageSize
    const queryBuilder = this.sysBlogArticleRepository
      .createQueryBuilder("article")
      .leftJoinAndSelect('article.tags', 'tag')
      .where("article.title LIKE :name", { name: `%${keywords || ''}%` })
    if (status != undefined) {
      queryBuilder.andWhere('article.status = :status', { status: query?.status })
    }
    const [data, total] = await queryBuilder.skip(skip).take(pageSize).getManyAndCount()
    return {
      list: data.map(item => {
        return {
          ...item,
          tags: item.tags.map(tag => tag.name)?.join(","),
        }
      }),
      total,
    }
  }

  /**
   * 添加文章
   */
  async add(data: AddBlogArticleDto) {
    const tags = await this.sysBlogTagRepository
      .createQueryBuilder('tag')
      .select()
      .where("tag.id in (:...ids)", { ids: data.tags.map(Number) })
      .getMany()

    const newArticle = new BlogArticle()
    for (let key in data) {
      newArticle[key] = data[key]
    }
    newArticle.tags = tags
    const result = await this.sysBlogArticleRepository.save(newArticle)
    return result
  }

  /**
   * 删除、批量删除
   * @param idArray
   */
  async delete(idArray: number[]) {
    for (const id of idArray) {
      await this.sysBlogArticleRepository.delete(id);
    }
    return true
  }

  /**
  * 详情
  * @param id 
  */
  async detail(id: number) {
    const res = await this.sysBlogArticleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.tags', 'tag')
      .where('article.id = :id', { id })
      .select()
      .getOne();
    return res;
  }

  /**
 * 修改状态
 * @param id 
 * @param query 
 */
  async updateStatus(id: number, query: UpdateArticleDto) {
    const res = await this.sysBlogArticleRepository.update(id, { status: query.status, updateTime: query.updateTime })
    return res;
  }
}