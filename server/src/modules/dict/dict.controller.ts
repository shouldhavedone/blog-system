import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from "@nestjs/common";
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DictService } from './dict.service';
import { AddDictDto, QueryDictDto, UpdateDictDto } from './dict.dto';
import { filterToOption } from "src/shared/utils/tree.util";

@ApiTags("字典")
@Controller("/api/v1/dict")

export class DictController {

  constructor(
    private readonly dictService: DictService,
  ) { }

  @ApiOperation({ summary: '分页获取字典列表' })
  @Get('page')
  async getByPage(@Res() res, @Query() query: QueryDictDto) {
    const data = await this.dictService.getDictByPage(query)
    res.send({
      code: "00000",
      data,
      msg: '一切ok'
    })
    return;
  }

  @ApiOperation({ summary: '获取字典列表-下拉选项' })
  @Get('options')
  async getAllList(@Res() res) {
    const result = await this.dictService.getAllList()
    const data = filterToOption(result)
    res.send({
      code: "00000",
      data,
      msg: '一切ok'
    })
    return;
  }

  @ApiOperation({ summary: "新增字典" })
  @Post("")
  async add(@Res() res, @Body() data: AddDictDto) {
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

  @ApiOperation({ summary: "字典详情" })
  @Get(":id/form")
  async getDetail(@Res() res, @Param("id") id: number) {
    const result = await this.dictService.detail(id)
    res.send({
      code: "00000",
      data: result,
      msg: '一切ok'
    })
  }
  
  @ApiOperation({ summary: "编辑字典" })
  @Put(":id")
  async update(@Res() res, @Param('id') id: number, @Body() data: UpdateDictDto) {
    const result = await this.dictService.update(id, data)
    res.send({
      code: "00000",
      data: result,
      msg: '一切ok'
    })
  }
}