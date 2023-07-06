import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { LoginPostDataDto } from "./auth.dto";
import { SysUser } from '../entities/SysUser.entity'
import { Repository } from "typeorm"
import * as svgCaptcha from 'svg-captcha';
import * as bcrypt from 'bcrypt';
import { saltRounds } from './constants'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(SysUser)
    private sysUserRepository: Repository<SysUser>,
    private readonly jwtService: JwtService
  ) { }

  async findAll(): Promise<SysUser[]> {
    return await this.sysUserRepository.find({})
  }

  async captche(size = 4) {
    const captcha = svgCaptcha.create({  //可配置返回的图片信息
      size, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100,  //宽度
      height: 34,  //高度
      background: '#cc9966',  //背景颜色
    });
    const base64Data = Buffer.from(captcha.data).toString('base64');
    const base64Image = `data:image/svg+xml;base64,${base64Data}`;
    return {
      text: captcha.text,
      data: base64Image,
    };
  }

  async generateToken(user: SysUser): Promise<string> {
    const payload = { username: user.username };
    return this.jwtService.sign(payload);
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      await this.jwtService.verifyAsync(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async validateUser(username: string, password: string): Promise<SysUser> {
    const user = await this.sysUserRepository.findOneBy({ username });
    if (!user) return null;
    // 校验密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;
    return user;
  }
}