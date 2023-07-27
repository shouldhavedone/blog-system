import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SysUser } from '../entities/SysUser.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from '../../shared/strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { SysRole } from '../entities/SysRole.entity';
import { PaginationService } from '../../shared/services/pagenation.service'
import { Repository } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([SysUser, SysRole]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' }, // 设置 Token 过期时间
    }),
    PassportModule.register({ defaultStrategy: 'local' }),

  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, UserService, PaginationService, Repository]
})

export class AuthModule { }