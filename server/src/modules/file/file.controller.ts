import { Controller, Get, Post, Res, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileService } from "./file.service";
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { ApiTags } from '@nestjs/swagger';
import * as dayjs from 'dayjs';

@ApiTags("文件管理")
@Controller('/api/v1/files')

export class FileContainer {
  constructor(
    private readonly fileService: FileService
  ) { }

  @Get('')
  async getToken(@Res() res) {
    const uplaodToken = await this.fileService.getUplaodToken()

    res.send({
      code: '00000',
      data: uplaodToken,
      msg: "一切ok"
    })
  }


  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Res() res) {
    try {
      const { originalname, buffer } = file;
      const lastPointIndex = originalname.lastIndexOf('.');
      const filename = `${dayjs(new Date()).format('YYYY-MM-DD')}/${originalname.slice(0, lastPointIndex)}_${new Date().getTime()}${originalname.slice(lastPointIndex)}`
      const result = await this.fileService.uploadFile(filename, buffer);
      res.send({
        code: '00000',
        data: {
          name: filename,
          url: result
        },
        msg: "一切ok"
      })
    } catch (error) {
      throw new Error('文件上传失败');
    }
  }
}