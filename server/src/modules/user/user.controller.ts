import { Controller, Get, Res, Headers, Query, Delete, Param, Patch, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { QueryUserDto } from "./user.dto";
import { query } from "express";

@ApiTags("用户")
@Controller("/api/v1/users")

export class UserController {

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) { }

  @ApiOperation({ summary: "当前角色信息-权限" })
  @Get('me')
  async getInfo(@Headers('authorization') authorizationHeader, @Res() res) {
    const userId = this.authService.extractUsernameFromToken(authorizationHeader)
    const data = await this.userService.getUserRole(userId)
    res.send({
      code: '00000',
      data: data,
      msg: "一切ok"
    })
  }

  @ApiOperation({ summary: "分页-用户列表" })
  @Get('page')
  async getByPage(@Res() res, @Query() query: QueryUserDto) {
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

  @ApiOperation({ summary: "详情" })
  @Get(":id/form")
  async getDetail(@Res() res, @Param("id") id: number) {
    const result = await this.userService.detail(id)
    res.send({
      code: "00000",
      data: result,
      msg: '一切ok'
    })
  }

  @ApiOperation({ summary: "修改用户密码" })
  @Patch(":id/password")
  async updatePwd(@Res() res, @Param("id") id: number, @Query() query) {
    const result = await this.userService.updatePwd(id, query)
    res.send({
      code: "00000",
      data: result,
      msg: '一切ok'
    })
  }

  @ApiOperation({ summary: "修改状态"})
  @Patch(":id/status")
  async updateStatus(@Res() res, @Param("id") id: number, @Query() query) {
    const result = await this.userService.updateStatus(id, query)

    res.send({
      code: "00000",
      data: result,
      msg: '一切ok'
    })
  }
}
