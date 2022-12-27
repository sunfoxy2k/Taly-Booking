import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn, OneToOne } from 'typeorm'
import { User } from './User.model'
import { EntityId } from 'typeorm/repository/EntityId'

@Entity('psychiatrist_resource')
export class PsychiatristResource extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
        id: EntityId

    @Column({
        default: false
    })
        isCertificateVerified: boolean

    @Column({
        default: ''
    })
        certificateDocument: string

    @Column({
        default: true
    })
        isAvailable: boolean

    @Column({
        nullable: true
    })
        averageRating: number

    @Column({
        default: 0
    })
        totalRating: number

    @Column({
        nullable: true
    })
        lowChangeRate: number

    @Column({
        nullable: true
    })
        highChangeRate: number

    @OneToOne(() => User, (user) => user.psychiatristResource)
        user: User

    @Column()
        field: string

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

    constructor(partial: Partial<PsychiatristResource>) {
        super()
        Object.assign(this, partial)
    }
}
