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