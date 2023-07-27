import { ApiProperty } from '@nestjs/swagger';

export class DeptQueryDto {
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