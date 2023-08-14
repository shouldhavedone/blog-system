import { Controller, Get, Res, Headers, Query, Delete, Param, Post, Body, Put } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { AuthService } from '../auth/auth.service';
import { MenuDto, QueryMenuDto, AddMenuDto, MENU_TYPE } from './menu.dto';
import { filterToOption } from '../../shared/utils/tree.util'

@ApiTags("菜单")
@Controller("/api/v1/menus")

export class MenuController {

  constructor(
    private readonly menuService: MenuService,
    private readonly authService: AuthService
  ) { }


  @ApiOperation({ summary: '获取登录角色菜单路由' })
  @Get("routes")
  async getMenuRoutes(@Headers("authorization") authorizationHeader, @Res() res) {
    const userId = this.authService.extractUsernameFromToken(authorizationHeader)
    const data = await this.menuService.getMenuListByRole(userId)
    res.send({
      code: "00000",
      data,
      msg: '一切ok'
    })
    return;
  }

  @Get("")
  @ApiOperation({ summary: '获取菜单路由列表' })
  async getAllMenu(@Res() res, @Query() query: QueryMenuDto) {
    const data = await this.menuService.getAllMenu(query)
    res.send({
      code: "00000",
      data,
      msg: '一切ok'
    })
    return;
  }


  @ApiOperation({ summary: "删除菜单" })
  @Delete(':ids')
  async delete(@Res() res, @Param('ids') ids: string) {
    const idArray = ids.split(',').map(Number);
    const result = await this.menuService.delete(idArray);
    res.send({
      code: "00000",
      data: result,
      msg: '一切ok'
    })
  }

  @ApiOperation({ summary: "详情" })
  @Get(":id/form")
  async getDetail(@Res() res, @Param("id") id: number) {
    const result = await this.menuService.detail(id)
    res.send({
      code: "00000",
      data: {
        ...result,
        type: Object.keys(MENU_TYPE)[result.type - 1],
        parentId: result.parentId?.id || 0
      },
      msg: '一切ok'
    })
  }

  @ApiOperation({ summary: '获取菜单列表-下拉选项' })
  @Get('options')
  async getAllList(@Res() res) {
    const result = await this.menuService.getAllMenu({})
    const data = filterToOption(result)
    res.send({
      code: "00000",
      data,
      msg: '一切ok'
    })
    return;
  }

  @ApiOperation({ summary: "新增菜单" })
  @Post('')
  async add(@Res() res, @Body() data: AddMenuDto, @Headers('authorization') authorizationHeader) {
    const userId = this.authService.extractUsernameFromToken(authorizationHeader)
    const result = await this.menuService.add(data, userId)
    res.send({
      code: "00000",
      data: result,
      msg: '一切ok'
    })
  }

  @ApiOperation({ summary: "编辑菜单" })
  @Put(":id")
  async update(@Res() res, @Param('id') id: number, @Body() data: AddMenuDto) {
    const result = await this.menuService.update(id, data)
    res.send({
      code: "00000",
      data: result,
      msg: '一切ok'
    })
  }
}
