/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { CoreModule } from './core/core.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { InterfaceModule } from './interface/interface.module';

@Module({
  providers: [ ],

  imports: [ 
 CoreModule, InfrastructureModule, InterfaceModule,  ],
  exports: [],
})
export class WalletModule {}
