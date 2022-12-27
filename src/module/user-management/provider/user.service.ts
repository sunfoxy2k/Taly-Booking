import { Injectable } from '@nestjs/common'
import { UserRepository } from '../database/repository/User.repository'
import { User } from '../database/model/User.model'
import { RegisterDto } from '../dto/register.dto'
import { UserAccount, AccountType } from '../database/model/UserAccount.model'
import { PsychiatristResource } from '../database/model/PsychiatristResource.model';

@Injectable()
export class UserService {
    constructor(
        private usersRepo: UserRepository,
    ) { }

    // async register(body: RegisterDto): Promise<User> {
    //     const userEntity = new User(body)

    //     const userAccountEntity = new UserAccount({
    //         user: userEntity,
    //         credential: body.password,
    //         accountType: AccountType.BASIC,
    //     })

    //     userEntity.userAccount = userAccountEntity

    //     return this.usersRepo.create(userEntity)
    // }

    async fullTextSearchPsychiatrist(keyword: string): Promise<User[]> {
        return this.usersRepo.fullTextSearchPsychiatrist(keyword)
    }

    async generatePsychiatrist(data: any): Promise<User> {
        const userEntity = new User(data)
        const psychiatristResource = new PsychiatristResource(data.psychiatristResource)
        userEntity.psychiatristResource = psychiatristResource


        const user = await this.usersRepo.create(userEntity)

        return user
    }
}
