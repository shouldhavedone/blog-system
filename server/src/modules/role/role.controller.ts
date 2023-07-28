import { Controller, Delete, Get, Param, Query, Res } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service,';
import { RoleQueryDto } from './role.dto';

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
}