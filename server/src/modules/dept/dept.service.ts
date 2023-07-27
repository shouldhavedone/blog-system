import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { SysDept } from '../entities/SysDept.entity';
import { buildTree } from "src/shared/utils/tree.util";
import { DeptQueryDto } from './dept.dto';

@Injectable()
export class DeptService {

  constructor(
    @InjectRepository(SysDept)
    private sysDeptRepository: Repository<SysDept>,
  ) { }

  async getDeptList(query: DeptQueryDto) {
    const queryBuilder = this.sysDeptRepository
      .createQueryBuilder('dept')
      .where('dept.name LIKE :name', { name: `%${query.keywords || ''}%` })
    if (query.status != undefined) {
      queryBuilder.andWhere('dept.status = :status', { status: query?.status })
    }
    const res = await queryBuilder.getMany();
    const treeData = buildTree(res)
    return treeData;
  }

  async getAllDeptList() {
    const res = await this.sysDeptRepository.find({})
    const treeData = buildTree(res)
    return treeData
  }
}