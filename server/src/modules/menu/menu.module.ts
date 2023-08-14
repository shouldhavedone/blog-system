import { Module } from "@nestjs/common";
import { MenuController } from "./menu.controller";
import { TypeOrmModule } from '@nestjs/typeorm'
import { MenuService } from './menu.service';
import { AuthService } from '../auth/auth.service';
import { SysUser } from "../entities/SysUser.entity";
import { JwtService } from "@nestjs/jwt";
import { SysMenu } from "../entities/SysMenu.entity";
import { UserService } from '../user/user.service';
import { SysRole } from '../entities/SysRole.entity';
import { Repository } from 'typeorm';
import { SysDept } from '../entities/SysDept.entity';
import { SysDict } from "../entities/SysDict.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SysUser, SysMenu, SysRole, SysDept, SysDict]) ],
  controllers: [MenuController],
  providers: [MenuService, AuthService, JwtService, UserService, Repository]
})

export class MenuModule { }