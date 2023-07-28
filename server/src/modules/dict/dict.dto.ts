import { ApiProperty } from '@nestjs/swagger';

export class QueryDictDto {
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
  typeCode: string;

  @ApiProperty({
    default: null,
    required: false,
  })
  name: string;
}

export class AddDictDto {
  @ApiProperty({
    default: ''
  })
  name: string;

  @ApiProperty({
    default: ''
  })
  typeCode: string;

  @ApiProperty({
    default: '',
    required: false,
  })
  value: string;

  @ApiProperty({
    default: 1,
    required: false,
  })
  status: number;

  @ApiProperty({
    default: 1,
    required: false,
  })
  sort: number;
}


export class UpdateDictDto {
  @ApiProperty({
    default: ''
  })
  typeCode: string;

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

  @ApiProperty({
    default: 0,
    required: false,
  })
  defaulted: number;

  @ApiProperty({
    default: '',
  })
  value: string;
}