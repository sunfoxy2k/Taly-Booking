import { LoggerService } from '@nestjs/common'
import { BaseEntity, DeleteResult, Repository, In, FindOptionsWhere } from 'typeorm'
import { IBaseRepository } from './base.repository.interface'
import { EntityId } from 'typeorm/repository/EntityId'

export abstract class BaseRepository<T extends BaseEntity, R extends Repository<T>> implements IBaseRepository<T> {

    constructor(
        protected readonly repository: R,
    ) {
    }

    findByIds(ids: [EntityId]): Promise<T[]> {
        const where = { id: In(ids) } as FindOptionsWhere<BaseEntity>
        return this.repository.findBy(where)
    }

    index(): Promise<T[]> {
        return this.repository.find()
    }

    findById(id: EntityId): Promise<T> {
        const where = { id: id } as FindOptionsWhere<BaseEntity>
        return this.repository.findOneBy(where)
    }

    create(data: T): Promise<T> {
        return this.repository.save(data)
    }

    async update(id: EntityId, data: any): Promise<T> {
        await this.repository.update(id, data)
        return this.findById(id)
    }

    delete(id: EntityId): Promise<DeleteResult> {
        return this.repository.delete(id)
    }
}
