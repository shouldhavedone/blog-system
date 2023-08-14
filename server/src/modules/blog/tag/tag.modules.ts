import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm'
import { BlogTag } from "src/modules/entities/BlogTag.entity";
import { BlogTagController } from './tag.controller';
import { BlogTagService } from './tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([BlogTag]),],
  controllers: [BlogTagController],
  providers: [BlogTagService],
})

export class BlogTagModule { }