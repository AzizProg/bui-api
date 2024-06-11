
import { CollaboratorRepositoryImpl } from "src/bui-collaborators/infrastructure/adapters/collaborator.repository-impl";
import { ICollaboratorRepository } from "../../domain/ports/collaborator.repository";
import { Inject } from "@nestjs/common";


export class FindAllCustomerUseCase{
    constructor (@Inject(CollaboratorRepositoryImpl) private readonly collaboratorRepo:ICollaboratorRepository){}

    async execute(): Promise<any> {
        return  await this.collaboratorRepo.findAllCustomers();
    
      }
}