import { ApiProperty } from '@nestjs/swagger';

export class QueryDictTypeDto {
  @ApiProperty({
    default: 1
  })
  pageNum: number;

  @ApiProperty({
    default: 10
  })
  pageSize: number;

  @ApiProperty({
    default: null,
    required: false,
  })
  keywords: string;
}


export class AddDictTypeDto {
  @ApiProperty({
    default: ''
  })
  code: string;

  @ApiProperty({
    default: ''
  })
  name: string;

  @ApiProperty({
    default: '',
    required: false,
  })
  remark: string;

  @ApiProperty({
    default: 1,
    required: false,
  })
  status: number;
}

export class UpdateDictTypeDto {
  @ApiProperty({
    default: ''
  })
  code: string;

  @ApiProperty({
    default: '',
    required: false
  })
  createTime: string;

  @ApiProperty({
    default: ''
  })
  id: number;

  @ApiProperty({
    default: ''
  })
  name: string;

  @ApiProperty({
    default: '',
    required: false,
  })
  remark: string;

  @ApiProperty({
    default: 1,
    required: false,
  })
  status: number;

  @ApiProperty({
    default: 1,
    required: false,
  })
  updateTime: string;
}