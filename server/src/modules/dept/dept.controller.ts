import { Controller, Get, Res, Headers, Req, Query, Param, Delete, Post, Body, Put } from "@nestjs/common";
import { DeptService } from "./dept.service";
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryDeptDto, AddDeptDto } from './dept.dto';
import { filterToOption } from '../../shared/utils/tree.util'

@ApiTags("部门")
@Controller("/api/v1/dept")

export class DeptController {

  constructor(
    private readonly deptService: DeptService,
  ) { }

  @ApiOperation({ summary: '获取部门列表' })
  @Get('')
  async getList(@Res() res, @Query() query: QueryDeptDto) {
    const data = await this.deptService.getList(query)
    res.send({
      code: "00000",
      data,
      msg: '一切ok'
    })
    return;
  }

  @ApiOperation({ summary: '获取部门列表-下拉选项' })
  @Get('options')
  async getAllList(@Res() res) {
    const result = await this.deptService.getAllList()
    const data = filterToOption(result)
    res.send({
      code: "00000",
      data,
      msg: '一切ok'
    })
    return;
  }

  @ApiOperation({ summary: "删除部门" })
  @Delete(':ids')
  async delete(@Res() res, @Param('ids') ids: string) {
    const idArray = ids.split(',').map(Number);
    const result = await this.deptService.delete(idArray);
    res.send({
      code: "00000",
      data: result,
      msg: '一切ok'
    })
  }

  @ApiOperation({ summary: "新增部门" })
  @Post("")
  async add(@Res() res, @Body() data: AddDeptDto) {
    const result = await this.deptService.add(data)
    res.send({
      code: "00000",
      data: result,
      msg: '一切ok'
    })
  }

  @ApiOperation({ summary: "部门详情" })
  @Get(":id/form")
  async getDetail(@Res() res, @Param("id") id: number) {
    const result = await this.deptService.detail(id)
    res.send({
      code: "00000",
      data: {
        ...result,
        parentId: result.parentId?.id || 0
      },
      msg: '一切ok'
    })
  }

  @ApiOperation({ summary: "编辑部门" })
  @Put(":id")
  async update(@Res() res, @Param('id') id: number, @Body() data: AddDeptDto) {
    const result = await this.deptService.update(id, data)
    res.send({
      code: "00000",
      data: result,
      msg: '一切ok'
    })
  }
}
