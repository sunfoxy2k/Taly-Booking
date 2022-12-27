import { BaseRepository } from '../../../../infras/repository/base.repository.service'
import { Repository } from 'typeorm'
import { User } from '../model/User.model'
import { InjectRepository } from '@nestjs/typeorm'
import { PsychiatristResource } from '../model/PsychiatristResource.model'
import { SearchDto } from '../../dto/search.dto';

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

    async fullTextSearchPsychiatrist(input: SearchDto): Promise<User[]> {
        // Create query with full text search PostgresSql feature with user role is psychiatrist
        input.page = input.page || 0

        let query = this.repository.createQueryBuilder()
            .select('user')
            .from(User, 'user')
            .leftJoinAndSelect(PsychiatristResource, 'psychiatrist_resource', 'psychiatrist_resource.id = user.psychiatristResourceId')
            .where('user.role = :role', { role: 'psychiatrist' })
            .offset(input.page * 10)
            .limit(10)

            if (input.field) {
                query = query.andWhere('psychiatrist_resource.field = :field', { field: input.field })
            }
            if (input.location) {
                query = query.andWhere('user.location = :location', { location: input.location })
            }

        if (input.keyword && input.keyword.length > 0) {
            query = query.andWhere(`
                to_tsvector(user.firstName)
                @@ plainto_tsquery(:keyword)`,
                { keyword: input.keyword }
                )
                .orWhere(`
                to_tsvector(user.lastName)
                @@ plainto_tsquery(:keyword)`,
                    { keyword: input.keyword }
                )
                .orWhere(`
                to_tsvector(user.profileBio)
                @@ plainto_tsquery(:keyword)`,
                    { keyword: input.keyword }
                )
        }

        console.log({ query: query.getQuery() })
        const result = await query.getMany()

        return result
    }
}
