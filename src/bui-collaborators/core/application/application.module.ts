import { Module } from '@nestjs/common';
import { CreateCollaboratorUseCase } from './usecases/create-collaborator.usecase';
import { FindAllCustomerUseCase } from './usecases/find-all-customer.usecase';
import { FindCollabaratorUseCase } from './usecases/find-collabarator.usecase.usescase';
import { FindAllTransactionsUseCase } from './usecases/find-all-transactions.usecase.ts';
import { InfrastructureModule } from 'src/bui-collaborators/infrastructure/infrastructure.module';
import { FindTransactionById } from './usecases/find-transaction-by-id.usecase';
import { FindCustomerById } from './usecases/find-customer-by-id.usecase';
@Module({
  imports: [InfrastructureModule],
  providers:[
    CreateCollaboratorUseCase,
    FindCollabaratorUseCase,
    FindAllCustomerUseCase,
    FindAllTransactionsUseCase,
  FindTransactionById,
  FindCustomerById
],
exports:[
    CreateCollaboratorUseCase,
    FindCollabaratorUseCase,
    FindAllCustomerUseCase,
    FindAllTransactionsUseCase,
    FindTransactionById,
    FindCustomerById
]
  
})
export class ApplicationModule {}
