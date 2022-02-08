
import OrderRepository from "../infra/typeorm/repositories/OrderRepository";

export default class ListOrdersService {
  public async execute(client_id: number) {
    const orderRepository = new OrderRepository();

    const orders = await orderRepository.listByClient(client_id);

    return orders;
  }
}