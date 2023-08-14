import { Controller, Delete, Get, Param, Post, Query, Res, Body, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { RoleQueryDto, AddRoleDto, UpdateRoleDto } from './role.dto';

@ApiTags("角色")
@Controller("/api/v1/roles")

export class RoleController {

  constructor(
    private readonly roleService: RoleService,
  ) { }


  @ApiOperation({ summary: "分页-角色列表" })
  @Get('page')
  async getRoleByPage(@Res() res, @Query() query: RoleQueryDto) {
    const data = await this.roleService.getRoleByPage(query)
    res.send({
      code: "00000",
      data,
      msg: '一切ok'
    })
    return;
  }

  @ApiOperation({ summary: "角色下拉列表" })
  @Get('options')
  async getRoleOption(@Res() res) {
    const data = await this.roleService.getAllRole();
    res.send({
      code: "00000",
      data: data.map(item => {
        return {
          label: item.name,
          value: item.id
        }
      }),
      msg: '一切ok'
    })
    return;
  }



  @ApiOperation({ summary: "删除角色" })
  @Delete(':ids')
  async delete(@Res() res, @Param('ids') ids: string) {
    const idArray = ids.split(',').map(Number);
    const result = await this.roleService.delete(idArray);
    res.send({
      code: "00000",
      data: result,
      msg: '一切ok'
    })
  }

  @ApiOperation({ summary: "详情" })
  @Get(":id/form")
  async getDetail(@Res() res, @Param("id") id: number) {
    const result = await this.roleService.detail(id)
    res.send({
      code: "00000",
      data: result,
      msg: '一切ok'
    })
  }

  @ApiOperation({ summary: "新增角色" })
  @Post('')
  async add(@Res() res, @Body() data: AddRoleDto) {
    const result = await this.roleService.add(data)
    res.send({
      code: "00000",
      data: result,
      msg: '一切ok'
    })
  }

  @ApiOperation({ summary: "编辑字典类型" })
  @Put(":id")
  async update(@Res() res, @Param('id') id: number, @Body() data: UpdateRoleDto) {
    const result = await this.roleService.update(id, data)
    res.send({
      code: "00000",
      data: result,
      msg: '一切ok'
    })
  }

  @ApiOperation({ summary: "获取角色的菜单ID集合" })
  @Get(":id/menuIds")
  async getMenus(@Res() res, @Param('id') roleId: number) {
    const result = await this.roleService.getMenus(roleId)
    res.send({
      code: "00000",
      data: result,
      msg: '一切ok'
    })
  }

  @ApiOperation({ summary: "分配菜单权限给角色" })
  @Put(":id/menus")
  async updateMenus(@Res() res, @Param('id') roleId: number, @Body() data: number[] | string[]) {
    const result = await this.roleService.updateMenus(roleId, data.map(Number))
    res.send({
      code: "00000",
      data: result,
      msg: '一切ok'
    })
  }


}