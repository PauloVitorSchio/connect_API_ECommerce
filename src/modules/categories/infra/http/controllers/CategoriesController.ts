import { Request, Response } from "express";
import CreateCategoryService from "../../../services/CreateCategoryService";
import DeleteCategoryService from "../../../services/DeleteCategoryService";
import FindCategoryByIdService from "../../../services/FindCategoryByIdService";
import FindAllCategoriesService from "../../../services/FindAllCategoriesService";
import UpdateCategoryService from "../../../services/UpdateCategoryService";

class CategoriesController {
    async create(request: Request, response: Response) {
        const data = request.body;

        const createCategory = new CreateCategoryService();

        const category = await createCategory.execute(data);

        return response.json(category);
    }

    async listAll(request: Request, response: Response) {
        const listCategories = new FindAllCategoriesService();

        const categories = await listCategories.execute();

        return response.json(categories);
    }

    async find(request: Request, response: Response) {
        const {id} = request.params;
        
        const findById = new FindCategoryByIdService();

        const category = await findById.execute(Number (id));

        return response.json(category);
    }

    async update(request: Request, response: Response) {
        const {id} = request.params;
        const data = request.body;

        const update = new UpdateCategoryService();

        const category = await update.execute({
            id: Number(id),
            ...data
        });

        return response.json(category);
    }

    async delete(request: Request, response: Response) {
        const {id} = request.params;

        const deleteCategory = new DeleteCategoryService();

        const result = await deleteCategory.execute(Number(id));

        return response.json(result);
    }
}

export default new CategoriesController();