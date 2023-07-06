import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { SysUser } from '../entities/SysUser.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([SysUser])],
  controllers: [UserController],
  providers: [UserService]
})

export class UserModule { }