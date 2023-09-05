import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryBlogTagDto, AddBlogTagDto, UpdateBlogTagDto } from './tag.dto';
import { BlogTag } from '../../entities/BlogTag.entity';


@Injectable()
export class BlogTagService {
  constructor(
    @InjectRepository(BlogTag)
    private sysBlogTagRepository: Repository<BlogTag>
  ) { }

  async getBlogTagByPage(query: QueryBlogTagDto) {
    const { pageNum, pageSize, keywords } = query;
    const skip = (pageNum - 1) * pageSize

    const queryBuilder = this.sysBlogTagRepository
      .createQueryBuilder("tag")
      .where("tag.name LIKE :name", { name: `%${keywords || ''}%` })

    const [data, total] = await queryBuilder.skip(skip).take(pageSize).getManyAndCount()
    return {
      list: data,
      total,
    }
  }


  /**
   * 添加
   * @param data 
   */
  async add(data: AddBlogTagDto) {
    const newBlogTag = this.sysBlogTagRepository.create(data)
    const res = await this.sysBlogTagRepository.save(newBlogTag)
    return res
  }


  /**
   * 删除、批量删除
   * @param idArray
   */
  async delete(idArray: number[]) {
    for (const id of idArray) {
      await this.sysBlogTagRepository.delete(id);
    }
    return true
  }


  /**
   * 详情
   * @param id 
   */
  async detail(id: number) {
    const res = await this.sysBlogTagRepository.findOneBy({ id })
    return res;
  }


  /**
   * 修改
   * @param id 
   * @param data 
   */
  async update(id: number, data: UpdateBlogTagDto) {
    const dataToUpdate = { id, ...data };
    const res = await this.sysBlogTagRepository.update(id, dataToUpdate)
    return res;
  }

  /**
   * 全部数据 - 下拉列表
   */
  async getAllList() {
    const res = await this.sysBlogTagRepository.find({})
    return res
  }
}