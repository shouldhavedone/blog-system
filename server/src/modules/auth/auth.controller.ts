import { Body, Controller, Get, Res, Post, Session, Req, UseGuards, Delete, Query } from '@nestjs/common';
import { GetDataDto, LoginPostDataDto } from "./auth.dto";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid'

import { AuthGuard } from '@nestjs/passport';

@ApiTags("用户权限/登录")
@Controller('/api/v1/auth')

export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @ApiOperation({ summary: '获取图片验证码' })
  @Get('captcha')
  async generateCaptcha(@Res() res, @Req() req) {
    const captcha = await this.authService.captche();
    const uuid = uuidv4().replace(/-/g, '');
    req.session.captchaUuid = uuid;
    req.session.captchaCode = captcha.text
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

  @ApiOperation({ summary: '用户登录' })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Res() res, @Req() req, @Query() data: LoginPostDataDto) {
    const { verifyCodeKey, verifyCode, username, password } = data;
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
    const user = await this.authService.validateUser(username, password);
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

  @ApiOperation({ summary: '退出登录' })
  @Delete("logout")
  async logout(@Req() req, @Res() res) {
    req.session.destroy()
    res.send({
      code: "00000",
      msg: "一切ok",
      data: "注销成功"
    })
    return false;
  }
}