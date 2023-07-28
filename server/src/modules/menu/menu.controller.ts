import { Controller, Get, Res, Headers, Query, Delete, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { AuthService } from '../auth/auth.service';
import { MenuDto, QueryMenuDto } from './menu.dto';
import { SysMenu } from '../entities/SysMenu.entity';

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
    const username = this.authService.extractUsernameFromToken(authorizationHeader)
    // console.log(username)
    const data = await this.menuService.getMenuListByRole(username)
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
}
