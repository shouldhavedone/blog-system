import { ApiProperty } from '@nestjs/swagger';

export class DictTypeQueryDto {
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


export class DictTypeAddDto {
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