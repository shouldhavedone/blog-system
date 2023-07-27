import { Controller, Get, Query, Res } from "@nestjs/common";
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DictTypeService } from './dictType.service';
import { DictTypeQueryDto } from './dictType.dto';

@ApiTags("字典类型相关")
@Controller("/api/v1/dict/types")

export class DictTypeController {

  constructor(
    private readonly dictTypeService: DictTypeService,
  ) { }

  @ApiOperation({ summary: '分页获取字典类型列表' })
  @Get('page')
  async getRoleByPage(@Res() res, @Query() query: DictTypeQueryDto) {
    const data = await this.dictTypeService.getDictTypeByPage(query)
    res.send({
      code: "00000",
      data,
      msg: '一切ok'
    })
  }
}