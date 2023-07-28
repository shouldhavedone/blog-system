import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DictTypeQueryDto, DictTypeAddDto } from './dictType.dto';
import { SysDictType } from '../entities/SysDictType.entity';


@Injectable()
export class DictTypeService {
  constructor(
    @InjectRepository(SysDictType)
    private sysDicTypetRepository: Repository<SysDictType>
  ) { }

  async getDictTypeByPage(query: DictTypeQueryDto) {
    const { pageNum, pageSize, keywords } = query;
    const skip = (pageNum - 1) * pageSize

    const queryBuilder = this.sysDicTypetRepository
      .createQueryBuilder("dictType")
      .where("dictType.name LIKE :name", { name: `%${keywords || ''}%` })

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
  async add(data: DictTypeAddDto) {
    const newDictType = this.sysDicTypetRepository.create(data)
    const res = await this.sysDicTypetRepository.save(newDictType)
    return res
  }


  /**
   * 删除、批量删除
   * @param idArray
   */
  async delete(idArray: number[]) {
    for (const id of idArray) {
      await this.sysDicTypetRepository.delete(id);
    }
    return true
  }
}