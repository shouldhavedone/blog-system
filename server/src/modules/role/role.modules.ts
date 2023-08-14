import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { SysRole } from '../entities/SysRole.entity';
import { SysMenu } from '../entities/SysMenu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SysRole, SysMenu]),],
  controllers: [RoleController],
  providers: [RoleService],
})

export class RoleModule { }