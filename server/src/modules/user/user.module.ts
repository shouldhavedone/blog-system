import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { SysUser } from '../entities/SysUser.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { SysRole } from '../entities/SysRole.entity';
import { Repository } from 'typeorm';
import { SysDept } from '../entities/SysDept.entity';
import { SysDict } from "../entities/SysDict.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SysUser, SysRole, SysDept, SysDict]),],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtService, Repository]
})

export class UserModule { }