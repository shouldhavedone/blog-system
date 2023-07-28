import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { SysUser } from '../entities/SysUser.entity'
import { Repository } from "typeorm"
import { SysRole } from "../entities/SysRole.entity";
import { UserQueryDto } from "./user.dto";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(SysUser)
    private sysUserRepository: Repository<SysUser>,
    @InjectRepository(SysRole)
    private sysRoleRepository: Repository<SysRole>,
  ) { }

  /**
   * 获取用户权限
   * @param username 用户名
   */
  async getUserRole(username: string) {
    const { user, roles } = await this.getUserRoleInfo(username)
    const params = {
      ...user,
      userId: user.id,
      roles: user.roles.map(item => item.code),
      perms: roles.menus.filter(item => item.perm).map(item => item.perm)
    }
    delete params.id;

    return params;
  }


  /**
   * 
   * @param username 获取用户账户信息
   */
  async getUserRoleInfo(username: string) {
    const user = await this.sysUserRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .select(['user.avatar', 'user.nickname', 'user.id', 'role.code', 'role.id'])
      .where('user.username = :username', { username: username })
      .getOne()
    const roles = await this.sysRoleRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.menus', 'menu')
      .select()
      // .where('role.id = :id', { id: user.roles[0].id })
      .where('role.id IN (:...ids)', { ids: user.roles.map(item => item.id) })
      .getOne()

    return {
      user,
      roles,
    }
  }


  /**
   * 分页查询用户列表
   * @param query 
   */
  async getUserByPage(query: UserQueryDto) {
    const { pageNum, pageSize, keywords, status, deptId } = query;
    const skip = (pageNum - 1) * pageSize
    const queryBuilder = this.sysUserRepository
      .createQueryBuilder('user')
      .where('user.username LIKE :name', { name: `%${keywords || ''}%` })

    if (status != undefined) {
      queryBuilder.andWhere('user.status = :status', { status })
    }
    if (deptId != undefined) {
      queryBuilder.andWhere('user.deptId = :deptId', { deptId })
    }
    const [data, total] = await queryBuilder.skip(skip).take(pageSize).getManyAndCount();
    return {
      list: data,
      total,
    };
  }

  /**
   * 删除、批量删除
   * @param idArray
   */
  async delete(idArray: number[]) {
    for (const id of idArray) {
      await this.sysUserRepository.delete(id);
    }
    return true
  }

   /**
   * 详情
   * @param id 
   */
   async detail(id: number) {
    const res = await this.sysUserRepository.findOneBy({ id })
    return res;
  }
}