import { ApiProperty } from '@nestjs/swagger';

export class RoleQueryDto {
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

export class AddRoleDto {
  @ApiProperty({
    default: ''
  })
  code: string;

  @ApiProperty({
    default: ''
  })
  name: string;

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

  @ApiProperty({
    default: 1,
  })
  dataScope: number;
}


export class UpdateRoleDto {
  @ApiProperty({
    default: null,
  })
  id: number;

  @ApiProperty({
    default: ''
  })
  code: string;

  @ApiProperty({
    default: ''
  })
  name: string;

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

  @ApiProperty({
    default: 1,
  })
  dataScope: number;

  @ApiProperty({
    default: 0,
    required: false,
  })
  deleted: number;

  @ApiProperty({
    default: '',
    required: false,
  })
  createTime: string;

  @ApiProperty({
    default: '',
    required: false,
  })
  updateTime: string;
}