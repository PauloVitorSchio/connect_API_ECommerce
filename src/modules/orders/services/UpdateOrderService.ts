import AppError from "../../../shared/errors/AppError";
import IOrderDTO from "../dtos/IOrderDTO";
import Order from "../infra/typeorm/entities/Order";
import OrderRepository from "../infra/typeorm/repositories/OrderRepository";

export default class UpdateOrderService {
  public async execute(data: IOrderDTO): Promise<Order> {
    
  }
}