import { Request, Response } from "express";
import FindAllProductsService from "../../../services/FindAllProductsService";
import CreateProductService from "../../../services/CreateProductService";
import FindProductByIdService from "../../../services/FindProductByIdService";
import UpdateProductService from "../../../services/UpdateProductService";
import DeleteProductService from "../../../services/DeleteProductService";

/**
 * O controller tem acesso as requisições e é o responsável por enviar uma
 * resposta
 *
 * Por padrão ele deve ter no máximo 5 métodos (index, create, show, update e delete)
 */
class ProductsController {
  async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createProductService = new CreateProductService();

    const product = await createProductService.execute(data);

    return response.json(product);
  }

  async list(request: Request, response: Response): Promise<Response> {
    const listAllProductsService = new FindAllProductsService();

    const products = await listAllProductsService.execute();

    return response.json(products);
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findProductById = new FindProductByIdService();

    const product = await findProductById.execute(Number(id));

    return response.json(product);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const { id } = request.params; // desestruturação

    const updateProductService = new UpdateProductService();

    const data_to_update = {
      ...data, // rest / spread operator
      id: Number(id),
    };

    const product = await updateProductService.execute(data_to_update);

    return response.json(product);
  }
  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProductService = new DeleteProductService();

    const result = await deleteProductService.execute(Number(id));

    return response.json(result);
  }
}

export default new ProductsController();