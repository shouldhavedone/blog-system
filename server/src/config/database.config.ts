
import { TypeOrmModule } from '@nestjs/typeorm'

export const databaseConfig = TypeOrmModule.forRoot({
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
})