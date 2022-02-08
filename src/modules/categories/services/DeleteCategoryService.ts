import CategoryRepository from "../infra/typeorm/repositories/CategoryRepository";
import FindCategoryByIdService from "./FindCategoryByIdService";


export default class DeleteCategoryService {
    public async execute(id: number) {
        const categoryRepository = new CategoryRepository();
        const findById = new FindCategoryByIdService();

        await findById.execute(id);

        const result = categoryRepository.delete(id);

        return result;
    }
}