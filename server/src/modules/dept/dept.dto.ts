import { ApiProperty } from '@nestjs/swagger';

export class QueryDeptDto {
  @ApiProperty({
    default: null,
    required: false,
  })
  keywords: string;

  @ApiProperty({
    default: null,
    required: false,
  })
  status: number;
}

export class AddDeptDto {
  @ApiProperty({
    default: '',
  })
  name: string;

  @ApiProperty({
    default: 0,
  })
  parentId: number;

  @ApiProperty({
    default: 1,
  })
  sort: number;

  @ApiProperty({
    default: 1,
    required: false,
  })
  status: number;

  @ApiProperty({
    default: 0,
    required: false,
  })
  deleted: number;
}

