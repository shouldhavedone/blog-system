import { Injectable } from "@nestjs/common";
import { RoleQueryDto } from './role.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { SysRole } from '../entities/SysRole.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(SysRole)
    private sysRoleRepository: Repository<SysRole>
  ) { }


  /**
   * 分页获取角色列表
   * @param query RoleQueryDto
   */
  async getRoleByPage(query: RoleQueryDto) {
    const { pageNum, pageSize, keywords } = query;
    const skip = (pageNum - 1) * pageSize

    const queryBuilder = this.sysRoleRepository
      .createQueryBuilder("role")
      .where("role.name LIKE :name", { name: `%${keywords || ''}%` })

    const [data, total] = await queryBuilder.skip(skip).take(pageSize).getManyAndCount()
    return {
      list: data,
      total,
    }
  }

  /**
   * 获取全部角色列表
   */
  async getAllRole() {
    const res = await this.sysRoleRepository.find({})
    return res;
  }

  /**
   * 删除、批量删除
   * @param idArray
   */
  async delete(idArray: number[]) {
    for (const id of idArray) {
      await this.sysRoleRepository.delete(id);
    }
    return true
  }

  
   /**
   * 详情
   * @param id 
   */
   async detail(id: number) {
    const res = await this.sysRoleRepository.findOneBy({ id })
    return res;
  }
}