import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "root",
      "password": "123456",
      "database": "system_server",
      "entities": [
        "dist/modules/**/*.entity{.ts,.js}"
      ],
      "synchronize": true
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
