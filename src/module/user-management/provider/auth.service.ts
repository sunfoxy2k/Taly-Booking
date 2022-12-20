import { Injectable } from '@nestjs/common'
import { UserRepository } from '../database/repository/User.repository'
import { User } from '../database/model/User.model'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './jwt.service'

export interface AuthTokens {
    access_token: string
    refresh_token?: string
}

@Injectable()
export class AuthService {
    constructor(
        private usersRepo: UserRepository,
        private jwtService: JwtService,
        ) { }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.usersRepo.findByEmail(email)
        if (!user || user.userAccount.credential !== password) {
            return null
        }
        
        return user
    }

    async generateToken(user: User) {
        const payload: JwtPayload = { 
            sub: user.id,
            username: user.username,
            role: user.role,
            resourceId: user.userAccount.id,
        }
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload),
        }
    }
}
