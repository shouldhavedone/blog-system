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

export class AddMenuDto {
  @ApiProperty({
    default: null,
    required: false
  })
  id?: number;

  @ApiProperty({
    default: ''
  })
  name: string;

  @ApiProperty({
    default: ''
  })
  icon: string;

  @ApiProperty({
    default: '0',
    required: false,
  })
  treePath: string;

  @ApiProperty({
    default: 1,
    required: false,
  })
  visible: number;

  @ApiProperty({
    default: 1,
    required: false,
  })
  sort: number;

  @ApiProperty({
    default: 0,
  })
  parentId: number;

  @ApiProperty({
    default: ''
  })
  redirect: string;
  
  @ApiProperty({
    default: ''
  })
  path: string;
  
  @ApiProperty({
    default: ''
  })
  type: string;

  @ApiProperty({
    default: '',
    required: false,
  })
  component?: string;
}


export const MENU_TYPE = {
  'MENU': 1,
  'CATALOG': 2,
  'EXTLINK': 3,
  "BUTTON": 4,
}