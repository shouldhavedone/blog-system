import { Controller, Get, Res, Headers, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { UserQueryDto } from "./user.dto";

@ApiTags("user")
@Controller("/api/v1/users")

export class UserController {

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) { }

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
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

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @Get('page')
  async getUserByPage(@Res() res, @Query() query: UserQueryDto) {
    const data = await this.userService.getUserByPage(query)
    res.send({
      code: '00000',
      data: data,
      msg: "一切ok"
    })
  }
}
