import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleController } from './role.controller';
import { RoleService } from './role.service,';
import { SysRole } from '../entities/SysRole.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SysRole]),],
  controllers: [RoleController],
  providers: [RoleService],
})

export class RoleModule { }