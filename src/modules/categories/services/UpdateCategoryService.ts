import AppError from "../../../shared/errors/AppError";
import ICategoryDTO from "../dtos/ICategoryDTO";
import Category from "../infra/typeorm/entities/Category";
import CategoryRepository from "../infra/typeorm/repositories/CategoryRepository";
import FindCategoryByIdService from "./FindCategoryByIdService";

export default class UpdateCategoryService {
    public async execute(data: ICategoryDTO): Promise<Category> {
        const categoryRepository = new CategoryRepository();
        const findById = new FindCategoryByIdService();

        if (!data.id) {
            throw new AppError("É necessário informar o id do cliente para atualização.");
        }

        await findById.execute(data.id);

        const category = await categoryRepository.update(data);

        return category;
    }
}