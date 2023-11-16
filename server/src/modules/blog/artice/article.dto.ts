import { ApiProperty } from '@nestjs/swagger';
import * as dayjs from 'dayjs';

export class QueryBlogArticleDto {
  @ApiProperty({
    default: 1
  })
  pageNum: number;

  @ApiProperty({
    default: 10
  })
  pageSize: number;

  @ApiProperty({
    default: undefined,
    required: false,
  })
  keywords: string;

  @ApiProperty({
    default: undefined,
    required: false,
  })
  status: number;
}

export class AddBlogArticleDto {
  @ApiProperty({
    default: ''
  })
  title: string;

  @ApiProperty({
    default: '',
  })
  desc: string;

  @ApiProperty({
    default: '',
  })
  content: string;

  @ApiProperty({
    default: null,
  })
  tags: number[] | string[];

  @ApiProperty({
    default: '',
  })
  imgUrl: string;

  @ApiProperty({
    default: 1,
  })
  status: number;

  @ApiProperty({
    default: null,
  })
  author: number;

  @ApiProperty({
    default: '',
  })
  createTime: string;

  @ApiProperty({
    default: '',
  })
  updateTime: string;


}

export class UpdateArticleDto {
  @ApiProperty({
    default: undefined,
    required: false,
  })
  id: number;

  @ApiProperty({
    default: '',
    required: false,
  })
  title: string;

  @ApiProperty({
    default: '',
    required: false,
  })
  desc: string;

  @ApiProperty({
    default: '',
    required: false,
  })
  content: string;

  @ApiProperty({
    default: null,
    required: false,
  })
  tags: number[] | string[];

  @ApiProperty({
    default: '',
    required: false,
  })
  imgUrl: string;

  @ApiProperty({
    default: 1,
    required: false,
  })
  status: number;

  @ApiProperty({
    default: null,
    required: false,
  })
  author: number;

  @ApiProperty({
    default: '',
    required: false,
  })
  updateTime?: string;
}