import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SysUser } from '../modules/SysUser.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([SysUser])],
  controllers: [AuthController],
  providers: [AuthService]
})

export class AuthModule { }