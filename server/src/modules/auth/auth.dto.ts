import { ApiProperty } from '@nestjs/swagger';

export class LoginPostDataDto {
  @ApiProperty({
    default: "admin"
  })
  username: string;

  @ApiProperty({
    default: '123456'
  })
  password: string;

  @ApiProperty({
    default: ""
  })
  verifyCodeKey?: string;

  @ApiProperty({
    default: ""
  })
  verifyCode?: string;
}

export class GetDataDto {
  @ApiProperty()
  id: string;
}