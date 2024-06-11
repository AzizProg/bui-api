/* eslint-disable prettier/prettier */
import { Inject } from '@nestjs/common';
import { ITransactionRepoSitory } from '../../domain/repositories/transaction.repository';
import { BuiWalletTransactionsEntity } from '../../domain/entities/bui-wallet-transactions.entity';
import { TransactionRepositoryImpl } from 'src/bui-wallet/infrastructure/adapters/transaction.repository.impl';


export class FindCustomerTransactionsUseCase {
  constructor(@Inject(TransactionRepositoryImpl) private readonly repository: ITransactionRepoSitory) {}

  async execute(customer_id:string): Promise<BuiWalletTransactionsEntity[]> {
    return await this.repository.findCustomerTransactionsById(customer_id);

  }
}
