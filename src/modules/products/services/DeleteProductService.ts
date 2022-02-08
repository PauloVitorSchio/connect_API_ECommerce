import { DeleteResult } from "typeorm";
import AppError from "../../../shared/errors/AppError";
import Product from "../infra/typeorm/entities/Product";
import ProductRepository from "../infra/typeorm/repositories/ProductRepository";
import FindProductByIdService from "./FindProductByIdService";

export default class DeleteProductService {
  public async execute(id: number): Promise<DeleteResult> {
    const productRepository = new ProductRepository();

    const findProductByIDService = new FindProductByIdService();

    await findProductByIDService.execute(id);

    const result = await productRepository.delete(id);

    return result;
  }
}