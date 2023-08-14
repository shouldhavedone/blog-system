import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { SysUser } from '../entities/SysUser.entity'
import { Brackets, Repository } from "typeorm"
import { SysRole } from "../entities/SysRole.entity";
import { QueryUserDto, UpdateUserDto } from "./user.dto";
import { AuthService } from '../auth/auth.service';
import { SysDept } from '../entities/SysDept.entity';
import { SysDict } from '../entities/SysDict.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(SysUser)
    private sysUserRepository: Repository<SysUser>,
    @InjectRepository(SysRole)
    private sysRoleRepository: Repository<SysRole>,
    @InjectRepository(SysDept)
    private sysDeptRepository: Repository<SysDept>,
    @InjectRepository(SysDict)
    private sysDictRepository: Repository<SysDict>,
    private readonly authService: AuthService,


  ) { }

  /**
   * 获取用户权限
   * @param userId 用户名
   */
  async getUserRole(userId: number) {
    const { user, roles } = await this.getUserRoleInfo(userId)
    const params = {
      ...user,
      userId: user.id,
      roles: user.roles.map(item => item.code),
      perms: roles.menus.filter(item => item.perm).map(item => item.perm)
    }
    return params;
  }


  /**
   * 获取用户账户信息
   * @param userId 
   */
  async getUserRoleInfo(userId: number) {
    const user = await this.sysUserRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .select(['user.avatar', 'user.nickname', 'user.id', 'role.code', 'role.id'])
      .where('user.id = :userId', { userId: userId })
      .getOne()
    const roles = await this.sysRoleRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.menus', 'menu')
      .select()
      .where('role.id IN (:...ids)', { ids: user.roles.map(item => item.id) })
      .getMany()

    return {
      user,
      roles: roles[0],
    }
  }


  /**
   * 分页查询用户列表
   * @param query 
   */
  async getUserByPage(query: QueryUserDto) {
    const { pageNum, pageSize, keywords, status, deptId } = query;
    const skip = (pageNum - 1) * pageSize
    const queryBuilder = this.sysUserRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .leftJoinAndSelect('user.dept', 'dept')
      .where(
        new Brackets(qb => {
          qb.where("user.username LIKE :keyword", { keyword: `%${keywords || ''}%` })
            .orWhere("user.nickname LIKE :keyword", { keyword: `%${keywords || ''}%` })
            .orWhere("user.mobile LIKE :keyword", { keyword: `%${keywords || ''}%` });
        })
      )
    if (status != undefined) {
      queryBuilder.andWhere('user.status = :status', { status })
    }

    if (deptId != undefined) {
      queryBuilder.andWhere('user.deptId = :deptId', { deptId: Number(deptId) })
    }

    const [data, total] = await queryBuilder.skip(skip).take(pageSize).getManyAndCount();
    const sexDict = await this.sysDictRepository.find({
      where: { typeCode: "gender" },
      select: ['value', 'name',]
    })
    const tempData = data.map(item => {
      return {
        ...item,
        deptName: item.dept?.name,
        roleName: item.roles?.map(role => role.name)?.join(","),
        genderLabel: sexDict.find(sex => Number(sex.value) === item.gender)?.name
      }
    })
    return {
      list: tempData,
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
    const res = await this.sysUserRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .leftJoinAndSelect('user.dept', 'dept')
      .where('user.id = :id', { id })
      .select(['user.id', 'user.avatar', 'user.email', 'user.gender', 'user.mobile', 'user.nickname', 'user.status', 'user.username', 'role.id', 'dept.id'])
      .getOne();
    return res;
  }

  /**
   * 修改用户密码
   * @param id 
   * @param query 
   */
  async updatePwd(id: number, query: UpdateUserDto) {
    const newPwd = await this.authService.encryptionPwd(query.password)
    const res = await this.sysUserRepository.update(id, { password: newPwd })
    return res;
  }


  /**
   * 修改用户状态
   * @param id 
   * @param query 
   */
  async updateStatus(id: number, query: UpdateUserDto) {
    console.log(query)
    const res = await this.sysUserRepository.update(id, { status: query.status })
    return res;
  }

  /**
   * 修改
   * @param id 
   * @param data 
   */
  async update(id: number, data: UpdateUserDto) {
    const user = await this.sysUserRepository.findOneBy({ id })
    const roles = await this.sysRoleRepository
      .createQueryBuilder('role')
      .select()
      .where('role.id IN (:...ids)', { ids: data.roleIds.map(Number) })
      .getMany()

    const dept = await this.sysDeptRepository.findOneBy({ id: Number(data.deptId) })

    const newUser = {
      ...user,
      roles,
      dept,
    }

    const res = await this.sysUserRepository.save(newUser)
    return res;
  }

  /**
  * 添加
  * @param data 
  */
  async add(data: UpdateUserDto) {
    const roles = await this.sysRoleRepository
      .createQueryBuilder('role')
      .select()
      .where('role.id IN (:...ids)', { ids: data.roleIds.map(Number) })
      .getMany()

    const dept = await this.sysDeptRepository.findOneBy({ id: Number(data.deptId) })
    const newUser = new SysUser()
    for (let key in data) {
      newUser[key] = data[key]
    }
    newUser.roles = roles;
    newUser.dept = dept;
    const res = await this.sysUserRepository.save(newUser)
    return res;
  }
}