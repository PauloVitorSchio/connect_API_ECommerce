import AppError from "../../../shared/errors/AppError";
import IOrderDTO from "../dtos/IOrderDTO";
import Order from "../infra/typeorm/entities/Order";
import OrderRepository from "../infra/typeorm/repositories/OrderRepository";
import FindProductByIdService from "../../products/services/FindProductByIdService";
import UpdateProductService from "../../products/services/UpdateProductService";

export default class CreateOrderService {
  public async execute(data: IOrderDTO): Promise<Order> {
    const orderRepository = new OrderRepository();
    const findById = new FindProductByIdService();
    const updateProduct = new UpdateProductService();
    const itemList = data.pedido_produtos;
    let valor_pedido: number = 0;

    if (itemList.length === 0) {
      throw new AppError("Pedidos necessitam ao menos um produto.");
    }

    if (Array.isArray(data.cliente_id)) {
      throw new AppError("Pedido pode ter apenas um comprador.");
    }

    for (let i=0; i<itemList.length; i++) {
      if (!itemList[i].quantidade) {
        throw new AppError("Informe as quantidades de todos os produtos.");
      }
      const produto = await findById.execute(itemList[i].produto_id);
      if (produto.quantidade < itemList[i].quantidade) {
        throw new AppError("Quantidade insuficiente em estoque.");
      }

      valor_pedido += (itemList[i].quantidade * produto.preco);

      const quantidade_updated = (produto.quantidade - itemList[i].quantidade);

      const product_updated = {
        id: produto.id,
        nome: produto.nome,
        quantidade: quantidade_updated,
        preco: produto.preco,
        category_id: produto.categoria_id
      };

      await updateProduct.execute(product_updated);
    }

    const order = await orderRepository.create({...data, valor: valor_pedido});

    return order;
  }
}
