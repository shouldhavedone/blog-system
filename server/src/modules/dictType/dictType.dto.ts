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