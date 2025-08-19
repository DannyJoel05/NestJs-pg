// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { PgService } from './pg.service';
import { OrmDatabaseModule } from './orm.module';

@Module({
    imports: [OrmDatabaseModule],
    providers: [PgService],
    exports: [PgService, OrmDatabaseModule],
})
export class DatabaseModule { }
