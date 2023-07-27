import { ApiProperty } from '@nestjs/swagger';
import { SysMenu } from '../entities/SysMenu.entity';

export class MenuDto {
  @ApiProperty({
    example: []
  })
  children?: Array<MenuDto>;

  @ApiProperty({
    example: ''
  })
  treePath?: string;

  @ApiProperty({
    example: ''
  })
  name?: string;

  @ApiProperty({
    example: ''
  })
  type?: number;

  @ApiProperty({
    example: ''
  })
  path?: string;

  @ApiProperty({
    example: ''
  })
  component?: string;

  @ApiProperty({
    example: ''
  })
  perm?: string;

  @ApiProperty({
    example: ''
  })
  sort?: number;

  @ApiProperty({
    example: ''
  })
  visible?: number;

  @ApiProperty({
    example: ''
  })
  icon?: string;

  @ApiProperty({
    example: ''
  })
  redirect?: string;
}

export class QueryMenuDto {
  @ApiProperty({
    example: null,
    required: false,
  })
  keywords?: string;
}