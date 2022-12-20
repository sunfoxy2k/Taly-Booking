import { BaseRepository } from '../../../../infras/repository/base.repository.service'
import { Repository } from 'typeorm'
import { User } from '../model/User.model'
import { InjectRepository } from '@nestjs/typeorm'

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
}
