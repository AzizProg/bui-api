import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customer.controller';
import { TransactionController } from './controllers/transaction.controller';
import { ApplicationModule } from '../core/application/application.module';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

@Module({
imports:[
    ApplicationModule,
    InfrastructureModule,
],
    controllers: [CustomerController,TransactionController],
})
export class InterfaceModule {}
