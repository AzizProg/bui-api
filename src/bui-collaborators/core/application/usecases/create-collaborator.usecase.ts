
import { CreateCollaboratorDto } from "src/bui-collaborators/interface/dto/create-collaborator.dto";
import { ICollaboratorRepository } from "../../domain/ports/collaborator.repository";
import { Inject } from "@nestjs/common";
import { CollaboratorRepositoryImpl } from "src/bui-collaborators/infrastructure/adapters/collaborator.repository-impl";



export class CreateCollaboratorUseCase{
    constructor (@Inject(CollaboratorRepositoryImpl) private readonly collaboratorRepo:ICollaboratorRepository){}

    async execute(collaboratorDto: CreateCollaboratorDto): Promise<any> {
        return  await this.collaboratorRepo.createCollaborator(collaboratorDto.username,collaboratorDto.password);
      }
}