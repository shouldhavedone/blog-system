import { Body, Controller, Get, Res, Post, Session, Req, UseGuards } from "@nestjs/common";
import { GetDataDto, LoginPostDataDto } from "./auth.dto";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid'

import { AuthGuard } from '@nestjs/passport';

@ApiTags("auth")
@Controller('/api/v1/auth')

export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: GetDataDto,
  })

  @Get('captcha')
  async generateCaptcha(@Res() res, @Session() session) {
    const captcha = await this.authService.captche();
    const uuid = uuidv4().replace(/-/g, '');
    session.captchaUuid = uuid;
    session.captchaCode = captcha.text
    console.log(uuid)
    console.log(captcha.text)
    res.send({
      code: '00000',
      data: {
        verifyCodeBase64: captcha.data,
        verifyCodeKey: uuid,
      },
      msg: "一切ok"
    })
  }

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: LoginPostDataDto,
  })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() data: LoginPostDataDto, @Res() res, @Req() req) {
    const { verifyCodeKey, verifyCode } = data;
    // 判断验证码是否过期
    if (verifyCodeKey !== req.session.captchaUuid) {
      res.send({
        code: "A0214",
        msg: "验证码过期",
      })
      return false;
    }
    // 判断验证码是否错误
    if (verifyCode.toLocaleLowerCase() !== req.session.captchaCode.toLocaleLowerCase()) {
      res.send({
        code: "A0214",
        msg: "验证码错误",
      })
      return false;
    }
    const user = await this.authService.validateUser(data.username, data.password);
    if (!user) {
      res.send({
        code: "B0001",
        msg: "用户名或密码错误",
      })
      return false;
    }
    const token = await this.authService.generateToken(user);
    res.send({
      code: "00000",
      data: {
        accessToken: token,
        expires: null,
        refreshToken: null,
        tokenType: 'Bearer'
      },
      msg: '一切ok'
    })
    return;
  }
}