
// import { Strategy } from 'passport-local'
// import { PassportStrategy } from '@nestjs/passport'
// import { Injectable, UnauthorizedException } from '@nestjs/common'
// import { AuthService } from './auth.service'
// import { User } from '../database/model/User.model'

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//     constructor(private authService: AuthService) {
//         super()
//     }

//     async validate(email: string, password: string): Promise<User> {
//         const user = await this.authService.validateUser(email, password)
//         if (!user) {
//             throw new UnauthorizedException()
//         }
//         return user
//     }
// }
