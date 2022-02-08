import IOrderDTO from "../../../dtos/IOrderDTO";
import IOrderRepository from "../../../repositories/IOrderRepository";
import { getRepository, Repository } from "typeorm";
import Order from "../entities/Order";

export default class OrderRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  async findById(id: number): Promise<Order | undefined> {
    return this.ormRepository
      .createQueryBuilder("pedidos")
      .leftJoinAndSelect("pedidos.pedido_produtos", "pp")
      .leftJoinAndSelect("pp.produto", "p")
      .where("pedidos.id = :id", { id })
      .getOne();
  }

  async create(data: IOrderDTO): Promise<Order> {
    const order = this.ormRepository.create(data);

    return this.ormRepository.save(order);
  }

  async listByClient(client_id: number): Promise<Order[]> {
  return this.ormRepository
    .createQueryBuilder("pedidos")
    .leftJoinAndSelect("pedidos.pedido_produtos", "pp")
    .leftJoinAndSelect("pp.produto", "p")
    .where("pedidos.cliente_id = :client_id", { client_id })
    .getMany();
  }

  async update(data: IOrderDTO): Promise<Order> {
    const order = await this.ormRepository.save(data);

    return order;
  }
}
