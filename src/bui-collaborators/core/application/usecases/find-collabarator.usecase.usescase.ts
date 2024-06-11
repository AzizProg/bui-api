
import { GetCollaboratorDto } from 'src/bui-collaborators/interface/dto/get-collaborator.dto';
import { ICollaboratorRepository } from '../../domain/ports/collaborator.repository';
import { Inject } from '@nestjs/common';
import { CollaboratorRepositoryImpl } from 'src/bui-collaborators/infrastructure/adapters/collaborator.repository-impl';

export class FindCollabaratorUseCase {
  constructor(@Inject(CollaboratorRepositoryImpl)private readonly collaboratorRepo: ICollaboratorRepository) {}

  async execute(collaboratorDto: GetCollaboratorDto): Promise<any> {
    return await this.collaboratorRepo.findCollaborator(
      collaboratorDto.username,
      collaboratorDto.password,
    );
  }
}
