import { Controller, Get, Res, Headers, Query } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { AuthService } from '../auth/auth.service';
import { MenuDto, QueryMenuDto } from './menu.dto';
import { SysMenu } from '../entities/SysMenu.entity';

@ApiTags("menu")
@Controller("/api/v1/menus")

export class MenuController {

  constructor(
    private readonly menuService: MenuService,
    private readonly authService: AuthService
  ) { }

  @ApiCreatedResponse({
    description: "菜单路由"
  })
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
  @ApiOperation({ summary: '获取菜单列表' }) // API操作的注释
  @ApiCreatedResponse({
    description: "菜单路由列表",
  })
  async getAllMenu(@Res() res, @Query() query: QueryMenuDto) {
    const data = await this.menuService.getAllMenu(query)
    res.send({
      code: "00000",
      data,
      msg: '一切ok'
    })
    return;
  }
}
