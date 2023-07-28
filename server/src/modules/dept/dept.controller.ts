import { Controller, Get, Res, Headers, Req, Query, Param, Delete } from "@nestjs/common";
import { DeptService } from "./dept.service";
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeptQueryDto } from './dept.dto';

@ApiTags("部门管理相关")
@Controller("/api/v1/dept")

export class DeptController {

  constructor(
    private readonly deptService: DeptService,
  ) { }


  
  @ApiOperation({ summary: '获取部门列表' })
  @Get('')
  async getDetpList(@Res() res, @Query() query: DeptQueryDto) {
    const data = await this.deptService.getDeptList(query)
    res.send({
      code: "00000",
      data,
      msg: '一切ok'
    })
    return;
  }


  
  @ApiOperation({ summary: '获取部门列表-下拉选项' })
  @Get('options')
  async getAllDetpList(@Res() res) {
    const result = await this.deptService.getAllDeptList()

    const data = this.filterToOption(result)

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


  filterToOption(data: any) {
    if (!data || data.length === 0) {
      return [];
    }
    return data.map((node) => {
      const newNode = {
        label: node.name,
        value: node.id,
        children: node?.children,
      };
      if (node.children && node.children.length > 0) {
        newNode.children = this.filterToOption(node.children);
      }
      return newNode;
    });
  }
}
