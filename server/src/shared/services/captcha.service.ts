import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class CaptchaService {
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
}
