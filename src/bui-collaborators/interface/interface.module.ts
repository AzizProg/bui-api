import { Module } from '@nestjs/common';
import { CollaboratorConttroller } from './controllers/collaborator.controller';
import { ApplicationModule } from '../core/application/application.module';

@Module({
    imports:[ApplicationModule],
    controllers:[
        CollaboratorConttroller
    ]
})
export class InterfaceModule {}
