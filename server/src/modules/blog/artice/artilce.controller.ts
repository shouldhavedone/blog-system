import { Body, Controller, Get, Post, Query, Res, Headers, Delete, Param, Patch } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddBlogArticleDto, QueryBlogArticleDto } from './article.dto';
import { BlogArticleService } from './article.service';
import { AuthService } from 'src/modules/auth/auth.service';
import * as dayjs from 'dayjs';

@ApiTags("文章")
@Controller('/api/v1/blog/article')
export class BlogArticleController {
  constructor(
    private readonly blogArticleService: BlogArticleService,
    private readonly authService: AuthService,
  ) { }

  @ApiOperation({ summary: '分页获取列表' })
  @Get('page')
  async getByPage(@Res() res, @Query() query: QueryBlogArticleDto) {
    const data = await this.blogArticleService.getListByPage(query)
    res.send({
      code: "00000",
      data,
      msg: '一切ok'
    })
  }

  @ApiOperation({ summary: "新增" })
  @Post("")
  async add(@Headers('authorization') authorizationHeader, @Res() res, @Body() data: AddBlogArticleDto) {
    const userId = this.authService.extractUsernameFromToken(authorizationHeader)
    data.author = userId
    data.createTime = dayjs(new Date()).format('YYYY-MM-DD hh:mm:ss')
    data.updateTime = data.createTime
    await this.blogArticleService.add(data)
    res.send({
      code: "00000",
      data: true,
      msg: '一切ok'
    })
  }

  @ApiOperation({ summary: "删除" })
  @Delete(':ids')
  async delete(@Res() res, @Param('ids') ids: string) {
    const idArray = ids.split(',').map(Number);
    const result = await this.blogArticleService.delete(idArray);
    res.send({
      code: "00000",
      data: result,
      msg: '一切ok'
    })
  }

  @ApiOperation({ summary: "详情" })
  @Get(":id/form")
  async getDetail(@Res() res, @Param("id") id: number) {
    const result = await this.blogArticleService.detail(id)
    res.send({
      code: "00000",
      data: {
        ...result,
        tags: result.tags?.map(item => item.id)
      },
      msg: '一切ok'
    })
  }

  @ApiOperation({ summary: "修改状态" })
  @Patch(":id/status")
  async updateStatus(@Res() res, @Param("id") id: number, @Query() query) {
    query.updateTime = dayjs(new Date()).format('YYYY-MM-DD hh:mm:ss')
    const result = await this.blogArticleService.updateStatus(id, query)
    res.send({
      code: "00000",
      data: result,
      msg: '一切ok'
    })
  }
}