
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { EntityId } from 'typeorm/repository/EntityId'

export interface JwtPayload {
    sub: EntityId
    username: string
    role: string
    resourceId: EntityId
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    async validate(payload: any): Promise<JwtPayload> {
        return {
            sub: payload.sub,
            username: payload.username,
            role: payload.role,
            resourceId: payload.resourceId,
        }
    }
}