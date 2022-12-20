import { TypeOrmModule } from '@nestjs/typeorm';

export const DatabaseModule = TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB_NAME,
    migrations: [
        '@infras/database/migrations/*.ts',
    ],
    autoLoadEntities: true,
})