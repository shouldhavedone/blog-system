import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SysDict } from '../entities/SysDict.entity';
import { Repository } from 'typeorm';
import { DictQueryDto, DictAddDto } from './dict.dto';


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
  async getDictByPage(query: DictQueryDto) {
    const { pageNum, pageSize, typeCode, name } = query;
    const skip = (pageNum - 1) * pageSize

    const queryBuilder = this.sysDictRepository
      .createQueryBuilder("dict")
      .where("dict.typeCode = :code", { code: typeCode })
      .where("dict.name LIKE :name", { name: `%${name || ''}%` })

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
  async add(data: DictAddDto) {
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
}