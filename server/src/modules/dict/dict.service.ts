import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SysDict } from '../entities/SysDict.entity';
import { Repository } from 'typeorm';
import { QueryDictDto, AddDictDto, UpdateDictDto } from './dict.dto';


@Injectable()
export class DictService {
  constructor(
    @InjectRepository(SysDict)
    private sysDictRepository: Repository<SysDict>
  ) { }

  /**
   * 查询-分页
   * @param query 
   */
  async getDictByPage(query: QueryDictDto) {
    const { pageNum, pageSize, typeCode, name } = query;
    const skip = (pageNum - 1) * pageSize
    console.log(typeCode)
    const queryBuilder = this.sysDictRepository
      .createQueryBuilder("dict")
      .where("dict.typeCode = :code", { code: typeCode })
      .andWhere("dict.name LIKE :name", { name: `%${name || ''}%` })

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
  async add(data: AddDictDto) {
    const newDict = this.sysDictRepository.create(data)
    const res = await this.sysDictRepository.save(newDict)
    return res
  }


  /**
   * 删除、批量删除
   * @param idArray
   */
  async delete(idArray: number[]) {
    for (const id of idArray) {
      await this.sysDictRepository.delete(id);
    }
    return true
  }

   /**
   * 详情
   * @param id 
   */
   async detail(id: number) {
    const res = await this.sysDictRepository.findOneBy({ id })
    return res;
  }

  /**
   * 修改
   * @param id 
   * @param data 
   */
  async update(id: number, data: UpdateDictDto) {
    const dataToUpdate = { id, ...data };
    const res = await this.sysDictRepository.update(id, dataToUpdate)
    return res;
  }
}