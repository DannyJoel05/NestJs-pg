import { Module, Provider } from '@nestjs/common';
import { envs } from './common/config';
import { ParameterModule } from './module/parameter/paramter';
import { Pool } from 'pg';
import { DatabaseModule } from './common/database';

export const databaseProviders: Provider[] = [
  {
    provide: 'PG_CONNECTION', // Token for injection
    useFactory: async () => {
      const pool = new Pool({
        user: envs.db.username,
        host: envs.db.host,
        database: envs.db.name,
        password: envs.db.password,
        port: envs.db.port,
      });
      await pool.connect(); // Test the connection
      return pool;
    },
  },
];

@Module({
  imports: [
    DatabaseModule,
    ParameterModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule { }

