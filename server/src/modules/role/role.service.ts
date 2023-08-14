import { Injectable } from "@nestjs/common";
import { RoleQueryDto, AddRoleDto, UpdateRoleDto } from './role.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { SysRole } from '../entities/SysRole.entity';
import { Repository } from 'typeorm';
import { SysMenu } from '../entities/SysMenu.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(SysRole)
    private sysRoleRepository: Repository<SysRole>,
    @InjectRepository(SysMenu)
    private sysMenuRepository: Repository<SysMenu>

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
      .addOrderBy("role.sort", "ASC");

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


  /**
   * 添加
   * @param data 
   */
  async add(data: AddRoleDto) {
    const newDictType = this.sysRoleRepository.create(data)
    const res = await this.sysRoleRepository.save(newDictType)
    return res
  }


  /**
   * 修改
   * @param id 
   * @param data 
   */
  async update(id: number, data: UpdateRoleDto) {
    const dataToUpdate = { id, ...data };
    const res = await this.sysRoleRepository.update(id, dataToUpdate)
    return res;
  }


  /**
   * 获取角色的菜单ID集合
   * @param roleId 角色id
   */
  async getMenus(roleId: number) {
    const role = await this.sysRoleRepository.findOne({
      where: { id: roleId },
      relations: ['menus']
    })
    const data = role.menus?.map(item => item.id)
    return data
  }


  /**
   * 分配菜单权限给角色
   * @param roleId 
   * @param menuIds 
   */
  async updateMenus(roleId: number, menuIds: number[]) {
    if (!menuIds.length) return [];

    const role = await this.sysRoleRepository.findOneBy({ id: roleId })
    const menus: SysMenu[] = await this.sysMenuRepository
      .createQueryBuilder("menu")
      .where("menu.id in (:...ids)", { ids: menuIds })
      .getMany()
    if (menus.length !== menuIds.length) {
      throw new Error('Some menus not found.');
    }
    role.menus = role?.menus?.filter((menu: SysMenu) => menuIds.includes(menu.id)) || [];
    const newMenus = menus.filter(menu => !role.menus.some(existingMenu => existingMenu.id === menu.id));
    role.menus.push(...newMenus);
    return await this.sysRoleRepository.save(role);
  }
}