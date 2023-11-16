import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { BlogArticle } from 'src/modules/entities/BlogArticle.entity';
import { BlogArticleController } from './artilce.controller';
import { BlogArticleService } from './article.service';
import { BlogTag } from 'src/modules/entities/BlogTag.entity';
import { AuthService } from '../../auth/auth.service';
import { SysUser } from '../../entities/SysUser.entity';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([BlogArticle, BlogTag, SysUser]),],
  controllers: [BlogArticleController],
  providers: [BlogArticleService, AuthService, JwtService],
})
export class BlogArticleModule { };