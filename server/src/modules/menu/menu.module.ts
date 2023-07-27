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
import { PaginationService } from '../../shared/services/pagenation.service'
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SysUser, SysMenu, SysRole]) ],
  controllers: [MenuController],
  providers: [MenuService, AuthService, JwtService, UserService, PaginationService, Repository]
})

export class MenuModule { }