import { Module } from '@nestjs/common'

import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { UserManagementModule } from '@src/module/user-management/user-management.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import databaseConfig from './config/database.config'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            load: [
                databaseConfig
            ]
        }),
        UserManagementModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT) || 5432,
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DB_NAME,
            entities: [
            ],
            // migrations: [
            //     '@infras/database/migrations/*.ts',
            // ],
            autoLoadEntities: true,
            synchronize: true,
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
