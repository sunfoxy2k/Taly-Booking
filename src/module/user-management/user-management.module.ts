import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

import { UserManagementController } from './user-management.controller'
import { LocalStrategy } from './provider/local.strategy'
import { JwtStrategy } from './provider/jwt.service'
import { AuthService } from './provider/auth.service'
import { UserRepository } from './database/repository/User.repository'
import { UserService } from './provider/user.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/model/User.model';
import { UserAccount } from './database/model/UserAccount.model';
import { PsychiatristResource } from './database/model/PsychiatristResource.model';
import { PatientResource } from './database/model/PaitentResource.model';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '30d' },
        }),
        TypeOrmModule.forFeature([
            User,
            UserAccount,
            PsychiatristResource,
            PatientResource,
        ])
    ],
    controllers: [UserManagementController],
    providers: [
        AuthService, 
        LocalStrategy, 
        JwtStrategy, 
        UserRepository,
        UserService,
    ]
})
export class UserManagementModule { }
