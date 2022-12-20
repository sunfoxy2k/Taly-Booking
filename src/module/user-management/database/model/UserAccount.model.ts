import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn, OneToOne } from 'typeorm'
import { User } from './User.model'
import { EntityId } from 'typeorm/repository/EntityId'

export enum AccountType {
    BASIC = 'basic',
}

@Entity('user_account')
export class UserAccount extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: EntityId

    @Column({
        type: 'enum',
        enum: AccountType,
        default: AccountType.BASIC,
    })
    accountType: AccountType

    @Column()
    credential: string

    @Column({
        type: 'jsonb',
        nullable: true,
    })
    metadata: object[]

    @OneToOne(() => User, (user) => user.userAccount)
    user: User

    @CreateDateColumn({
        default: 'now()',
        nullable: true,
    })
    createdAt: string

    @UpdateDateColumn({
        default: 'now()',
        nullable: true,
    })
    updatedAt: string

    @DeleteDateColumn({
        default: 'now()',
        nullable: true,
    })
    deletedAt: string

    constructor(partial: Partial<UserAccount>) {
        super()
        Object.assign(this, partial)
    }
}
