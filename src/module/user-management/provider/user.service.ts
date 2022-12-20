import { Injectable } from '@nestjs/common'
import { UserRepository } from '../database/repository/User.repository'
import { User } from '../database/model/User.model'
import { RegisterDto } from '../dto/register.dto'
import { UserAccount, AccountType } from '../database/model/UserAccount.model'

@Injectable()
export class UserService {
    constructor(
        private usersRepo: UserRepository,
    ) { }

    async register(body: RegisterDto): Promise<User> {
        const userEntity = new User(body)

        const userAccountEntity = new UserAccount({
            user: userEntity,
            credential: body.password,
            accountType: AccountType.BASIC,
        })

        userEntity.userAccount = userAccountEntity

        return this.usersRepo.create(userEntity)
    }
}
