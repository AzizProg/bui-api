import { Inject, Injectable } from "@nestjs/common";
import { ICollaboratorRepository } from "../../domain/ports/collaborator.repository";
import { CollaboratorRepositoryImpl } from "src/bui-collaborators/infrastructure/adapters/collaborator.repository-impl";



export class FindAllTransactionsUseCase{
    constructor (@Inject(CollaboratorRepositoryImpl)private readonly collaboratorRepo:ICollaboratorRepository){}

    async execute(): Promise<any> {
        return  await this.collaboratorRepo.findAllTransactions();
      }
}