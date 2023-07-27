import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm'
import { SysDictType } from '../entities/SysDictType.entity';
import { DictTypeService } from './dictType.service';
import { DictTypeController } from './dictType.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SysDictType]),],
  controllers: [DictTypeController],
  providers: [DictTypeService],
})

export class DictTypeModule { }