import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';

import { databaseConfig } from './config/database.config'

import { UserModule } from './modules/user/user.module';
import { MenuModule } from './modules/menu/menu.module';
import { DeptModule } from './modules/dept/dept.module';
import { RoleModule } from './modules/role/role.modules';
import { DictModule } from './modules/dict/dict.modules';
import { FileModule } from './modules/file/file.module';
import { DictTypeModule } from './modules/dictType/dictType.modules';

import { BlogTagModule } from './modules/blog/tag/tag.modules';
import { BlogArticleModule } from './modules/blog/artice/article.module';

@Module({
  imports: [
    databaseConfig,
    AuthModule,
    UserModule,
    MenuModule,
    DeptModule,
    RoleModule,
    DictModule,
    FileModule,
    DictTypeModule,
    BlogTagModule,
    BlogArticleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
