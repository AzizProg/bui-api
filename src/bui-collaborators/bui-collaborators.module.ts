import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { InterfaceModule } from './interface/interface.module';

@Module({
  imports: [CoreModule, InfrastructureModule, InterfaceModule],

})
export class BuiCollaboratorsModule {}
