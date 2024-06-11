import { Inject, Injectable } from "@nestjs/common";
import { ICollaboratorRepository } from "../../domain/ports/collaborator.repository";
import { CollaboratorRepositoryImpl } from "src/bui-collaborators/infrastructure/adapters/collaborator.repository-impl";



export class FindCustomerById{
    constructor (@Inject(CollaboratorRepositoryImpl)private readonly collaboratorRepo:ICollaboratorRepository){}

    async execute(customer_id:number): Promise<any> {
        return  await this.collaboratorRepo.findCustomerById(customer_id);
      }
}