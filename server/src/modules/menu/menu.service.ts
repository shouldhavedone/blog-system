import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { SysMenu } from '../entities/SysMenu.entity';
import { MenuDto, QueryMenuDto, AddMenuDto, MENU_TYPE } from './menu.dto';
import { UserService } from "../user/user.service";
import { buildTree } from "src/shared/utils/tree.util";


@Injectable()
export class MenuService {

  constructor(
    @InjectRepository(SysMenu)
    private sysMenuRepository: Repository<SysMenu>,
    private readonly userService: UserService
  ) { }

  /**
   * 获取用户菜单
   * @param userId 
   */
  async getMenuListByRole(userId: number) {
    const { roles } = await this.userService.getUserRoleInfo(userId)
    const filterRoles = roles.menus.filter(item => item.type < 4).map(item => {
      const { treePath, component, visible, icon, name, path, id } = item
      return {
        id,
        treePath,
        component,
        meta: {
          hidden: !Boolean(visible),
          icon,
          keepAlive: true,
          roles: [roles.code],
          title: name,
        },
        children: [],
        name: path,
        path,
      }
    })
    const treeData = buildTree(filterRoles)
    return treeData
  }

  /**
   * 获取全部菜单
   * @param query 
   */
  async getAllMenu(query: QueryMenuDto) {
    const res = await this.sysMenuRepository
      .createQueryBuilder('menu')
      .where('menu.name LIKE :name', { name: `%${query.keywords || ''}%` })
      .addOrderBy("menu.id", "ASC")
      .addOrderBy("menu.sort", "ASC")
      .getMany()
    const menuData = res.map(item => {
      return {
        ...item,
        type: Object.keys(MENU_TYPE)[item.type - 1]
      }
    })
    const treeData = buildTree(menuData)
    return treeData
  }

  /**
   * 删除、批量删除
   * @param idArray
   */
  async delete(idArray: number[]) {
    for (const id of idArray) {
      await this.sysMenuRepository.delete(id);
    }
    return true
  }

  /**
  * 详情
  * @param id 
  */
  async detail(id: number) {
    const res = await this.sysMenuRepository.findOne({
      where: { id },
      relations: ['parentId'],
    })
    return res;
  }

  /**
   * 添加菜单
   * @param data 
   * @param userId 
   */
  async add(data: AddMenuDto, userId: number) {
    const parent = await this.sysMenuRepository.findOne({ where: { id: data.parentId } })
    if (!parent) {
      data.parentId = null;
      data.component = 'Layout'
    }
    const newMenu = new SysMenu()
    for (let key in data) {
      newMenu[key] = data[key]
    }
    newMenu['type'] = MENU_TYPE[data['type']]
    newMenu['treePath'] = parent ? `${parent.treePath},${parent.id}` : '0';

    newMenu['createBy'] = userId
    newMenu['updateBy'] = userId

    const res = await this.sysMenuRepository.save(newMenu)
    return res
  }

  /**
   * 修改
   * @param id 
   * @param data 
   */
  async update(id: number, data: any) {
    const dataToUpdate = { ...data, id, parentId: Number(data.parentId) };
    if (data.parentId != 0) {
      const parent = await this.sysMenuRepository.findOneBy({ id: dataToUpdate.parentId })
      let treePath = `${parent.treePath},${parent.id}`
      dataToUpdate.treePath = treePath;
      dataToUpdate.parentId = parent
    } else {
      dataToUpdate.parentId = null
      dataToUpdate.treePath = '0';
    }
    dataToUpdate.type = MENU_TYPE[dataToUpdate.type]
    const res = await this.sysMenuRepository.update(id, dataToUpdate)
    return res;
  }
}