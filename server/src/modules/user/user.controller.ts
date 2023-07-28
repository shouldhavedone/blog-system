import { Controller, Get, Res, Headers, Query, Delete, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { UserQueryDto } from "./user.dto";

@ApiTags("用户")
@Controller("/api/v1/users")

export class UserController {

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) { }

  @ApiOperation({ summary: "当前角色信息-权限" })
  @Get('me')
  async getUserInfo(@Headers('authorization') authorizationHeader, @Res() res) {
    const username = this.authService.extractUsernameFromToken(authorizationHeader)
    const data = await this.userService.getUserRole(username)
    res.send({
      code: '00000',
      data: data,
      msg: "一切ok"
    })
  }

  @ApiOperation({ summary: "分页-用户列表" })
  @Get('page')
  async getUserByPage(@Res() res, @Query() query: UserQueryDto) {
    const data = await this.userService.getUserByPage(query)
    res.send({
      code: '00000',
      data: data,
      msg: "一切ok"
    })
  }

  
  @ApiOperation({ summary: "删除用户" })
  @Delete(':ids')
  async delete(@Res() res, @Param('ids') ids: string) {
    const idArray = ids.split(',').map(Number);
    const result = await this.userService.delete(idArray);
    res.send({
      code: "00000",
      data: result,
      msg: '一切ok'
    })
  }
}
