import { Inject, Injectable } from "@nestjs/common";
import { ICollaboratorRepository } from "../../domain/ports/collaborator.repository";
import { CollaboratorRepositoryImpl } from "src/bui-collaborators/infrastructure/adapters/collaborator.repository-impl";



export class FindTransactionById{
    constructor (@Inject(CollaboratorRepositoryImpl)private readonly collaboratorRepo:ICollaboratorRepository){}

    async execute(transaction_id:number): Promise<any> {
        return  await this.collaboratorRepo.findTransactionById(transaction_id);
      }
}