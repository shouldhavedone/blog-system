import { Controller, Get, Res, Headers, Req, Query } from "@nestjs/common";
import { DeptService } from "./dept.service";
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { DeptQueryDto } from './dept.dto';
import { filter } from "rxjs";

@ApiTags("dept")
@Controller("/api/v1/dept")

export class DeptController {

  constructor(
    private readonly deptService: DeptService,
  ) { }


  @ApiCreatedResponse({

  })

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


  @ApiCreatedResponse({

  })

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



  filterToOption(data: any) {
    if (!data || data.length === 0) {
      return [];
    }
    return data.map((node) => {
      const newNode = {
        label: node.name,
        value: node.id,
        children: node.children,
      };
      if (node.children && node.children.length > 0) {
        newNode.children = this.filterToOption(node.children); // 递归处理子节点
      }
      return newNode;
    });
  }
}
