import { Module } from "@nestjs/common";
import { DeptController } from "./dept.controller";
import { DeptService } from "./dept.service";
import { TypeOrmModule } from '@nestjs/typeorm'
import { SysDept } from '../entities/SysDept.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SysDept]),],
  controllers: [DeptController],
  providers: [DeptService],
})

export class DeptModule { }