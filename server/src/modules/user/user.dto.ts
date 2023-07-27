import { ApiProperty } from '@nestjs/swagger';

export class UserQueryDto {
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

  @ApiProperty({
    default: null,
    required: false,
  })
  status: number;

  @ApiProperty({
    default: null,
    required: false,
  })
  deptId: number;
}