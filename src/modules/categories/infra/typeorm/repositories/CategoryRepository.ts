import ICategoryDTO from "../../../dtos/ICategoryDTO";
import ICategoryRepository from "../../../repositories/ICategoryRepository";
import Category from "../../typeorm/entities/Category";

import { DeleteResult, getRepository, Repository } from "typeorm";

export default class CategoryRepository implements ICategoryRepository {
    private ormRepository: Repository<Category>;

    constructor() {
        this.ormRepository = getRepository(Category);
    }

    async create(data: ICategoryDTO): Promise<Category> {
        const category = this.ormRepository.create(data);
        return this.ormRepository.save(category);
    }

    async listAll(): Promise<Category[]> {
        const categories = this.ormRepository.find();
        return categories;
    }

    async findById(id: number): Promise<Category | undefined> {
        const category = this.ormRepository.findOne(id);
        return category;
    }

    async update(data: ICategoryDTO): Promise<Category> {
        return this.ormRepository.save(data);
    }

    async delete(id: number): Promise<DeleteResult> {
        const result = this.ormRepository.delete(id);
        return result;
    }

}
