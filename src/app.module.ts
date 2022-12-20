import { Module } from '@nestjs/common'

import { DatabaseModule } from '@src/infras/repository/database.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { SearchModule } from '@search/search.module'

@Module({
    imports: [
        DatabaseModule,
        SearchModule, 
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
