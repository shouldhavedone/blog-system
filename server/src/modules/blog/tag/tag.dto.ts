import { ApiProperty } from '@nestjs/swagger';

export class QueryBlogTagDto {
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


export class AddBlogTagDto {
  @ApiProperty({
    default: ''
  })
  name: string;

  @ApiProperty({
    default: '',
    required: false,
  })
  desc: string;

  @ApiProperty({
    default: 1,
    required: false,
  })
  status: number;
}

export class UpdateBlogTagDto {
  @ApiProperty({
    default: ''
  })
  name: string;

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
    default: '',
    required: false
  })
  desc: string;

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