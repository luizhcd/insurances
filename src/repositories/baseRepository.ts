import { Model, ModelCtor, } from "sequelize-typescript";
import NotFoundError from "../errors/notFoundError";

export default abstract class BaseRepository<T extends Model> {
  modelClass: ModelCtor<T>;

  constructor(modelClass: ModelCtor<T>) {
    this.modelClass = modelClass;
  }

  create(body: any) {
    return this.modelClass.create(body)
  }

  getAll(limit?: number, offset?: number) {
    return this.modelClass.findAll({
      offset: offset ?? 0,
      limit: limit ?? 10
    })
  }

  getItem(id: number): Promise<T | null> {
    return this.modelClass.findByPk(id)
  }

  async findOneAndDelete(id: number): Promise<T> {
    const policy = await this.modelClass.findByPk(id)
    if (!policy) {
      throw new NotFoundError("Entity not found");
    }
    await policy.destroy()
    return policy

  }

  async update(id, body: any): Promise<T> {
    const policy = await this.modelClass.findByPk(id)
    if (!policy) {
      throw new NotFoundError("Entity not found");
    }
    return policy.update(body)
  }

}
