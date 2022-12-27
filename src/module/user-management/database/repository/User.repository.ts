import { BaseRepository } from '../../../../infras/repository/base.repository.service'
import { Repository } from 'typeorm'
import { User } from '../model/User.model'
import { InjectRepository } from '@nestjs/typeorm'
import { PsychiatristResource } from '../model/PsychiatristResource.model';

export class UserRepository extends BaseRepository<User, Repository<User>> {
    constructor(
        @InjectRepository(User)
        repository: Repository<User>,
    ) {
        super(repository)
    }

    async findByEmail(email: string): Promise<User> {
        return this.repository.findOne({ 
            where: { email: email },
            relations: [
                'user_account',
                'psychiatrist_resource',
                'patient_resource',
            ]
         })
    }

    async fullTextSearchPsychiatrist(keyword: string): Promise<User[]> {
        // Create query with full text search PostgresSql feature with user role is psychiatrist
        const query = this.repository.createQueryBuilder()
            .select('user')
            .from(User, 'user')
            .leftJoinAndSelect(PsychiatristResource, 'psychiatrist_resource', 'user.psychiatristResourceId = psychiatrist_resource.id')
            .where('user.role = :role', { role: 'psychiatrist' })
            .andWhere(`
                to_tsvector(user.firstName)
                @@ to_tsquery(:keyword)`,
                { keyword: keyword }
            )
            .limit(10)
            // || to_tsvector(user.lastName)
            // || to_tsvector(user.email)
            // || to_tsvector(user.profileBio)
            // || to_tsvector(psychiatrist_resource.field) 
        
        console.log({ query: query.getQuery() })
        const result = await query.getMany()

        return result
    }
}
