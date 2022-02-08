import { Request, Response } from "express";
import Order from "../../../../orders/infra/typeorm/entities/Order";
import ListOrdersService from "../../../../orders/services/ListOrdersByClient";

class ClientOrderController {
  async list(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listOrdersService = new ListOrdersService();

    const orders = await listOrdersService.execute(Number(id));

    return response.json(orders);
  }
}

export default new ClientOrderController();