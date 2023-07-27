import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';

import { databaseConfig } from './config/database.config'
import { UserModule } from './modules/user/user.module';
import { MenuModule } from './modules/menu/menu.module';
import { DeptModule } from './modules/dept/dept.module';

@Module({
  imports: [
    databaseConfig,
    AuthModule,
    UserModule,
    MenuModule,
    DeptModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
