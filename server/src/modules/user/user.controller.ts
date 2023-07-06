import { Body, Controller, Get, Res, Post, Session, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("user")
@Controller("/api/v1/users")

export class UserController {

  constructor(private readonly userService: UserService) { }

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @Get('me')
  getUserInfo(@Res() res) {
    console.log('获取用户信息')
    res.send("获取用户信息")
  }
}