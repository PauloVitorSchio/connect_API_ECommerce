import AppError from "../../../shared/errors/AppError";
import IClientDTO from "../dtos/IClientDTO";
import Client from "../infra/typeorm/entities/Client";
import ClientRepository from "../infra/typeorm/repositories/ClientRepository";
import FindClientByIdService from "./FindClientByIdService";

export default class UpdateClientService {
  public async execute(data: IClientDTO): Promise<Client> {
    const clientRepository = new ClientRepository();
    const findClientById = new FindClientByIdService();

    if (!data.id) {
      throw new AppError("Atualização precisa do id do cliente");
    }

    await findClientById.execute(data.id);

    const clientList = await clientRepository.list();

    clientList.forEach(element => {
      if(element.cpf === data.cpf) {
        throw new AppError("CPF já cadastrado.");
      }
    });

    const client = await clientRepository.update(data);

    return client;
  }
}
