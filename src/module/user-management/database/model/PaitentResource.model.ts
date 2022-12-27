import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn, OneToOne } from 'typeorm'
import { User } from './User.model'
import { EntityId } from 'typeorm/repository/EntityId'

@Entity('patient_resource')
export class PatientResource extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: EntityId

    @Column({
        default: false
    })
    isPrivate: boolean

    @OneToOne(() => User, (user) => user.patientResource)
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

    constructor(partial: Partial<PatientResource>) {
        super()
        Object.assign(this, partial)
    }
}
