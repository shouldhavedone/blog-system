import { Controller, Get, Query, Res } from "@nestjs/common";
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DictService } from './dict.service';
import { DictQueryDto } from './dict.dto';

@ApiTags("字典管理相关")
@Controller("/api/v1/dict")

export class DictController {

  constructor(
    private readonly dictService: DictService,
  ) { }



  @ApiOperation({ summary: '分页获取字典列表' })
  @Get('page')
  async getRoleByPage(@Res() res, @Query() query: DictQueryDto) {
    const data = await this.dictService.getDictByPage(query)
    res.send({
      code: "00000",
      data,
      msg: '一切ok'
    })
    return;
  }
}