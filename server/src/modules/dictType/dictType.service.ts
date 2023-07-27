import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DictTypeQueryDto } from './dictType.dto';
import { SysDictType } from '../entities/SysDictType.entity';


@Injectable()
export class DictTypeService {
  constructor(
    @InjectRepository(SysDictType)
    private sysDicTypetRepository: Repository<SysDictType>
  ) {}

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
}