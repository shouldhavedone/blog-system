import { ApiProperty } from '@nestjs/swagger';

export class QueryUserDto {
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

export class UpdateUserDto {
  @ApiProperty({
    default: null,
    required: false,
  })
  password: string;

  @ApiProperty({
    default: 1,
    required: false,
  })
  status: number;

  @ApiProperty({
    default: null,
    required: false,
  })
  id: number;

  @ApiProperty({
    default: null,
    required: false,
  })
  deptId: number;

  @ApiProperty({
    default: '',
    required: false,
  })
  avatar: string;

  @ApiProperty({
    default: '',
    required: false,
  })
  email: string;

  @ApiProperty({
    default: 1,
    required: false,
  })
  gender: number;

  @ApiProperty({
    default: null,
    required: false,
  })
  mobile: string;

  @ApiProperty({
    default: '',
  })
  nickname: string;

  @ApiProperty({
    default: [],
  })
  roleIds: number[];

  @ApiProperty({
    default: '',
  })
  username: string;

}

