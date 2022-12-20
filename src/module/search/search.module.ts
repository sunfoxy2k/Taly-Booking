import { Module } from '@nestjs/common'
import { SearchController } from './search.controller'
import { SearchDoctor } from './provider/SearchDoctor'

@Module({
    imports: [],
    controllers: [SearchController],
    providers: [SearchDoctor]
})
export class SearchModule {}
