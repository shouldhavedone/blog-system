import { Body, Controller, Get, Headers, Post, Query } from "@nestjs/common";
import { GetDataDto, PostDataDto } from "./auth.dto";
import { AuthService } from "./auth.service";
import { SysUser } from '../modules/SysUser.entity'

@Controller('/auth')

export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Get('')
  fetch(@Query() params: GetDataDto, @Headers('token') token): string {
    console.log(token)
    return this.authService.getAuth(params.id)
  }

  @Post()
  save(@Body() data: PostDataDto) {
    return this.authService.postAuth(data)
  }

  @Get('all')
  getAll(@Query() params: GetDataDto, @Headers('token') token): Promise<SysUser[]> {
    return this.authService.findAll();
  }
}