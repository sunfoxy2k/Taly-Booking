import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn, OneToOne } from 'typeorm'
import { User } from './User.model'
import { EntityId } from 'typeorm/repository/EntityId'

@Entity('psychiatrist_resource')
export class PsychiatristResource extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
        id: EntityId

    @Column()
        isCertificateVerified: boolean

    @Column()
        certificateDocument: string

    @Column()
        isAvailable: boolean

    @Column()
        averageRating: number

    @Column()
        totalRating: number

    @Column()
        lowChangeRate: number

    @Column()
        highChangeRate: number

    @OneToOne(() => User, (user) => user.psychiatristResource)
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

    constructor(partial: Partial<PsychiatristResource>) {
        super()
        Object.assign(this, partial)
    }
}
