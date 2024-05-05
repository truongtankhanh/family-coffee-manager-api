import { DeepPartial, FindManyOptions, FindOneOptions, ObjectLiteral, Repository } from 'typeorm';

export class BaseService<Entity extends ObjectLiteral> {
  private repository: Repository<Entity>;

  constructor(_repository: Repository<Entity>) {
    this.repository = _repository;
  }

  public async find(fields?: FindManyOptions<Entity>): Promise<Entity[]> {
    return await this.repository.find(fields);
  }

  public async findOne(fields: FindOneOptions<Entity>): Promise<Entity | null> {
    return await this.repository.findOne(fields);
  }

  public async findAndCount(fields?: FindManyOptions<Entity>): Promise<[Entity[], number]> {
    return await this.repository.findAndCount(fields);
  }

  public async findByIds(ids: string[]): Promise<Entity[]> {
    return await this.repository.findByIds(ids);
  }

  public async findOneOrFail(options: FindOneOptions<Entity>): Promise<Entity> {
    return await this.repository.findOneOrFail(options);
  }

  public createEntity(entity: DeepPartial<Entity>): Entity {
    return this.repository.create(entity);
  }

  public createEntities(entities: DeepPartial<Entity>[]): Entity[] {
    return this.repository.create(entities);
  }

  public async saveEntity(entity: Entity): Promise<Entity> {
    return await this.repository.save(entity);
  }

  public async saveEntities(entities: Entity[]): Promise<Entity[]> {
    return await this.repository.save(entities);
  }

  public async count(options?: FindManyOptions<Entity>): Promise<number> {
    return await this.repository.count(options);
  }

  public async query(query: string) {
    return await this.repository.query(query);
  }

  public async softRemoveEntity(entity: Entity): Promise<Entity> {
    return await this.repository.softRemove(entity);
  }

  public async softRemoveEntities(entities: Entity[]): Promise<Entity[]> {
    return await this.repository.softRemove(entities);
  }
}
