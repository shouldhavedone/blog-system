import { Body, Controller, Get, Post, Query, Res, Delete, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DictTypeService } from './dictType.service';
import { QueryDictTypeDto, AddDictTypeDto, UpdateDictTypeDto } from './dictType.dto';

@ApiTags("字典类型")
@Controller("/api/v1/dict/types")

export class DictTypeController {

  constructor(
    private readonly dictTypeService: DictTypeService,
  ) { }

  @ApiOperation({ summary: '分页获取字典类型列表' })
  @Get('page')
  async getByPage(@Res() res, @Query() query: QueryDictTypeDto) {
    const data = await this.dictTypeService.getDictTypeByPage(query)
    res.send({
      code: "00000",
      data,
      msg: '一切ok'
    })
  }

  @ApiOperation({ summary: "新增字典类型" })
  @Post("")
  async add(@Res() res, @Body() data: AddDictTypeDto) {
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

  @ApiOperation({ summary: "字典类型详情" })
  @Get(":id/form")
  async getDetail(@Res() res, @Param("id") id: number) {
    const result = await this.dictTypeService.detail(id)
    res.send({
      code: "00000",
      data: result,
      msg: '一切ok'
    })
  }

  @ApiOperation({ summary: "编辑字典类型" })
  @Put(":id")
  async update(@Res() res, @Param('id') id: number, @Body() data: UpdateDictTypeDto) {
    const result = await this.dictTypeService.update(id, data)
    res.send({
      code: "00000",
      data: result,
      msg: '一切ok'
    })
  }
}