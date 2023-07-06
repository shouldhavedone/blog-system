import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';

import { databaseConfig } from './config/database.config'
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    databaseConfig,
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
