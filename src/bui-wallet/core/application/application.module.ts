import { Module } from '@nestjs/common';
import { CreateCustomerUseCase } from './usecases/create-customer.usecase';
import { GetCustomerUseCase } from './usecases/get-customer.usecase';
import {  CreateTransactionUseCase } from './usecases/create-transaction.usecase';
import { FindCustomerTransactionsUseCase } from './usecases/find-customers-transactions.usescase';
import { FindTransactionByIdUseCase } from './usecases/find-transaction-by-id.usecase';
import { InfrastructureModule } from 'src/bui-wallet/infrastructure/infrastructure.module';
import { UpdateTransactionUseCase } from './usecases/update-transaction.usecase';
import { DeleteTransactionUseCase } from './usecases/delete-transaction.usecase';

@Module({
    imports:[
        InfrastructureModule
    ],
    providers:[
        CreateCustomerUseCase,
        GetCustomerUseCase,
        CreateTransactionUseCase,
        FindTransactionByIdUseCase,
        FindCustomerTransactionsUseCase,
        UpdateTransactionUseCase,
        DeleteTransactionUseCase
    ],
    exports:[
        CreateCustomerUseCase,
        GetCustomerUseCase,
        CreateTransactionUseCase,
        FindTransactionByIdUseCase,
        FindCustomerTransactionsUseCase,
        UpdateTransactionUseCase,
        DeleteTransactionUseCase
    ]
})
export class ApplicationModule {}
