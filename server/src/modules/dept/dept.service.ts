import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { SysDept } from '../entities/SysDept.entity';
import { buildTree } from "src/shared/utils/tree.util";
import { QueryDeptDto, AddDeptDto } from './dept.dto';

@Injectable()
export class DeptService {

  constructor(
    @InjectRepository(SysDept)
    private sysDeptRepository: Repository<SysDept>,
  ) { }

  /**
   * 全部数据
   * @param query 
   */
  async getList(query: QueryDeptDto) {
    const queryBuilder = this.sysDeptRepository
      .createQueryBuilder('dept')
      .where('dept.name LIKE :name', { name: `%${query.keywords || ''}%` })
      .addOrderBy("dept.sort", "ASC")
    if (query.status != undefined) {
      queryBuilder.andWhere('dept.status = :status', { status: query?.status })
    }
    const res = await queryBuilder.getMany();
    const treeData = buildTree(res)
    return treeData;
  }


  /**
   * 全部数据 - 下拉列表
   */
  async getAllList() {
    const res = await this.sysDeptRepository.find({})
    const treeData = buildTree(res)
    return treeData
  }

  /**
   * 删除、批量删除
   * @param idArray
   */
  async delete(idArray: number[]) {
    for (const id of idArray) {
      await this.sysDeptRepository.delete(id);
    }
    return true
  }

  /**
  * 添加
  * @param data 
  */
  async add(data: AddDeptDto) {
    const parent = await this.sysDeptRepository.findOne({ where: { id: data.parentId } })
    if (!parent) {
      data.parentId = null;
    }
    const newDict = new SysDept()
    for (let key in data) {
      newDict[key] = data[key]
    }
    newDict['treePath'] = parent ? `${parent.treePath},${parent.id}` : '0'
    const res = await this.sysDeptRepository.save(newDict)
    return res
  }

  /**
  * 详情
  * @param id 
  */
  async detail(id: number) {
    const res = await this.sysDeptRepository.findOne({
      where: { id },
      relations: ['parentId'],
    })
    return res;
  }

  /**
   * 修改
   * @param id 
   * @param data 
   */
  async update(id: number, data) {
    const dataToUpdate = { ...data, id, parentId: Number(data.parentId) };
    if (data.parentId != 0) {
      const parent = await this.sysDeptRepository.findOneBy({ id: dataToUpdate.parentId })
      let treePath = `${parent.treePath},${parent.id}`
      dataToUpdate.treePath = treePath;
      dataToUpdate.parentId = parent
    } else {
      dataToUpdate.parentId = null
      dataToUpdate.treePath = '0';
    }
    const res = await this.sysDeptRepository.update(id, dataToUpdate)
    return res;
  }
}