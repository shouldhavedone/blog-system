
import { TypeOrmModule } from '@nestjs/typeorm'

// export const databaseConfig = TypeOrmModule.forRoot({
//   "type": "mysql",
//   "host": "localhost",
//   "port": 3306,
//   "username": "root",
//   "password": "123456",
//   "database": "system_server",
//   "entities": [
//     "dist/modules/**/*.entity{.ts,.js}"
//   ],
//   "synchronize": true
// })

export const databaseConfig = TypeOrmModule.forRoot({
  "type": "mysql",
  "host": "mysql.sqlpub.com",
  "port": 3306,
  "username": "shouldhavedone",
  "password": "QGgDWY8P0yE0DHBS",
  "database": "system_server",
  "entities": [
    "dist/modules/**/*.entity{.ts,.js}"
  ],
  "synchronize": true
})
