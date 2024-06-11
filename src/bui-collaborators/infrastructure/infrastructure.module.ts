import { Module } from '@nestjs/common';
import { CollaboratorRepositoryImpl } from './adapters/collaborator.repository-impl';
import { CollaboratorPrismaService } from './database/prisma/collaborator.prisma.service';

@Module({
    providers:[
        CollaboratorRepositoryImpl,      
        {
            provide:"CollaboratorPrismaService",
            useClass:CollaboratorPrismaService
        }
    ],
    exports:[
        CollaboratorRepositoryImpl,
       
    ]

})
export class InfrastructureModule {}
