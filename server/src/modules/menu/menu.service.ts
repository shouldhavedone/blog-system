import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { SysMenu } from '../entities/SysMenu.entity';
import { MenuDto, QueryMenuDto } from './menu.dto';
import { UserService } from "../user/user.service";
import { buildTree } from "src/shared/utils/tree.util";


@Injectable()
export class MenuService {

  constructor(
    @InjectRepository(SysMenu)
    private sysMenuRepository: Repository<SysMenu>,
    private readonly userService: UserService
  ) { }

  async getMenuListByRole(username: string) {
    const { roles } = await this.userService.getUserRoleInfo(username)
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


  async getAllMenu(query: QueryMenuDto) {
    const res = await this.sysMenuRepository
      .createQueryBuilder('menu')
      .where('menu.name LIKE :name', { name: `%${query.keywords || ''}%` })
      .getMany()

    const treeData = buildTree(res)
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
    const res = await this.sysMenuRepository.findOneBy({ id })
    return res;
  }
}