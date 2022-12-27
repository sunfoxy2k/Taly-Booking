import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn } from 'typeorm'
import { PsychiatristResource } from './PsychiatristResource.model'
import { EntityId } from 'typeorm/repository/EntityId'
import { PatientResource } from './PatientResource'
import { UserAccount } from './UserAccount.model'

export enum UserRole {
    PSYCHIATRIST = 'psychiatrist',
    PATIENT = 'patient',
}

export enum MeetingType {
    ONLINE = 'online',
    CLINIC = 'clinic',
    HOME_VISIT = 'home_visit',
}

@Entity('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: EntityId

    @Unique(['username'])
    @Column()
    username: string

    @Unique(['email'])
    @Column()
    email: string

    @Column({
        default: false,
    })
    isEmailVerified: boolean

    @Unique(['phone_number'])
    @Column({
        nullable: true,
    })
    phoneNumber: string

    @Column({
        default: false,
    })
    isPhoneNumberVerified: boolean

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({
        default: 'https://cataas.com/cat',
    })
    profilePictureUrl: string

    @Column({
        default: '',
    })
    profileBio: string

    @Column({
        default: false,
    })
    isBanned: boolean

    @Column({
        default: '',
    })
    banReason: string

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.PATIENT,
    })
    role: UserRole

    @Column({
        type: 'enum',
        enum: MeetingType,
        array: true,
        default: [MeetingType.ONLINE],
    })
    meetingType: MeetingType[]

    @Column({
        nullable: true,
    })
    location: string

    @OneToOne(() => PsychiatristResource, { cascade: true })
    @JoinColumn({
        // name: 'psychiatristResourceId',
    })
    psychiatristResource: PsychiatristResource

    @OneToOne(() => PatientResource)
    @JoinColumn({
        // name: 'patientResourceId',
    })
    patientResource: PatientResource

    @OneToOne(() => UserAccount, {
        cascade: true,
    })
    @JoinColumn({
        // name: 'userAccountId',
    })
    userAccount: UserAccount

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
        nullable: true,
    })
    deletedAt: string

    constructor(partial: Partial<User>) {
        super()
        Object.assign(this, partial)
    }
}
