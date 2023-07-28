import { ApiProperty } from '@nestjs/swagger';

export class DictQueryDto {
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

export class DictAddDto {
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