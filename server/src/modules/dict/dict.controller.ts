import { Body, Controller, Delete, Get, Param, Post, Query, Res } from "@nestjs/common";
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DictService } from './dict.service';
import { DictAddDto, DictQueryDto } from './dict.dto';

@ApiTags("字典管理相关")
@Controller("/api/v1/dict")

export class DictController {

  constructor(
    private readonly dictService: DictService,
  ) { }



  @ApiOperation({ summary: '分页获取字典列表' })
  @Get('page')
  async getDictByPage(@Res() res, @Query() query: DictQueryDto) {
    const data = await this.dictService.getDictByPage(query)
    res.send({
      code: "00000",
      data,
      msg: '一切ok'
    })
    return;
  }


  @ApiOperation({ summary: "新增字典" })
  @Post("")
  async add(@Res() res, @Body() data: DictAddDto) {
    const result = await this.dictService.add(data)
    res.send({
      code: "00000",
      data: result,
      msg: '一切ok'
    })
  }

  @ApiOperation({ summary: "删除字典" })
  @Delete(':ids')
  async delete(@Res() res, @Param('ids') ids: string) {
    const idArray = ids.split(',').map(Number);
    const result = await this.dictService.delete(idArray);
    res.send({
      code: "00000",
      data: result,
      msg: '一切ok'
    })
  }
}