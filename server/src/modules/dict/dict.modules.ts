import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm'
import { SysDict } from '../entities/SysDict.entity';
import { DictService } from './dict.service';
import { DictController } from './dict.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SysDict]),],
  controllers: [DictController],
  providers: [DictService],
})

export class DictModule { }