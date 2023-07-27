import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SysDict } from '../entities/SysDict.entity';
import { Repository } from 'typeorm';
import { DictQueryDto } from './dict.dto';


@Injectable()
export class DictService {
  constructor(
    @InjectRepository(SysDict)
    private sysDictRepository: Repository<SysDict>
  ) { }

  /**
   * 
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
}