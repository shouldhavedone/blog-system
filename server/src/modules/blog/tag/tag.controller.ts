import { Body, Controller, Get, Post, Query, Res, Delete, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BlogTagService } from './tag.service';
import { QueryBlogTagDto, AddBlogTagDto, UpdateBlogTagDto } from './tag.dto';
import { filterToOption } from 'src/shared/utils/tree.util';

@ApiTags("标签")
@Controller("/api/v1/blog/tag")

export class BlogTagController {

  constructor(
    private readonly blogTagService: BlogTagService,
  ) { }

  @ApiOperation({ summary: '分页获取标签列表' })
  @Get('page')
  async getByPage(@Res() res, @Query() query: QueryBlogTagDto) {
    const data = await this.blogTagService.getBlogTagByPage(query)
    res.send({
      code: "00000",
      data,
      msg: '一切ok'
    })
  }

  @ApiOperation({ summary: "新增标签" })
  @Post("")
  async add(@Res() res, @Body() data: AddBlogTagDto) {
    const result = await this.blogTagService.add(data)
    res.send({
      code: "00000",
      data: result,
      msg: '一切ok'
    })
  }

  @ApiOperation({ summary: "删除标签" })
  @Delete(':ids')
  async delete(@Res() res, @Param('ids') ids: string) {
    const idArray = ids.split(',').map(Number);
    const result = await this.blogTagService.delete(idArray);
    res.send({
      code: "00000",
      data: result,
      msg: '一切ok'
    })
  }

  @ApiOperation({ summary: "标签详情" })
  @Get(":id/form")
  async getDetail(@Res() res, @Param("id") id: number) {
    const result = await this.blogTagService.detail(id)
    res.send({
      code: "00000",
      data: result,
      msg: '一切ok'
    })
  }

  @ApiOperation({ summary: "编辑标签" })
  @Put(":id")
  async update(@Res() res, @Param('id') id: number, @Body() data: UpdateBlogTagDto) {
    const result = await this.blogTagService.update(id, data)
    res.send({
      code: "00000",
      data: result,
      msg: '一切ok'
    })
  }

  
  @ApiOperation({ summary: '获取标签列表-下拉选项' })
  @Get('options')
  async getAllList(@Res() res) {
    const result = await this.blogTagService.getAllList()
    const data = filterToOption(result)
    res.send({
      code: "00000",
      data,
      msg: '一切ok'
    })
    return;
  }
}