import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { SysUser } from '../entities/SysUser.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { SysRole } from '../entities/SysRole.entity';
import { PaginationService } from '../../shared/services/pagenation.service'
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SysUser, SysRole]),],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtService, PaginationService, Repository]
})

export class UserModule { }