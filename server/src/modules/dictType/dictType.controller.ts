import { Body, Controller, Get, Post, Query, Res, Delete, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DictTypeService } from './dictType.service';
import { DictTypeQueryDto, DictTypeAddDto } from './dictType.dto';

@ApiTags("字典类型相关")
@Controller("/api/v1/dict/types")

export class DictTypeController {

  constructor(
    private readonly dictTypeService: DictTypeService,
  ) { }

  @ApiOperation({ summary: '分页获取字典类型列表' })
  @Get('page')
  async getByPage(@Res() res, @Query() query: DictTypeQueryDto) {
    const data = await this.dictTypeService.getDictTypeByPage(query)
    res.send({
      code: "00000",
      data,
      msg: '一切ok'
    })
  }

  @ApiOperation({ summary: "新增字典类型" })
  @Post("")
  async add(@Res() res, @Body() data: DictTypeAddDto) {
    const result = await this.dictTypeService.add(data)
    res.send({
      code: "00000",
      data: result,
      msg: '一切ok'
    })
  }

  @ApiOperation({ summary: "删除字典类型" })
  @Delete(':ids')
  async delete(@Res() res, @Param('ids') ids: string) {
    const idArray = ids.split(',').map(Number);
    const result = await this.dictTypeService.delete(idArray);
    res.send({
      code: "00000",
      data: result,
      msg: '一切ok'
    })
  }
}