import { Inject } from '@nestjs/common';
import { BuiWalletTransactionsEntity } from '../../domain/entities/bui-wallet-transactions.entity';
import { ITransactionRepoSitory } from '../../domain/repositories/transaction.repository';
import { TransactionRepositoryImpl } from 'src/bui-wallet/infrastructure/adapters/transaction.repository.impl';


export class CreateTransactionUseCase {
  constructor(@Inject(TransactionRepositoryImpl) private readonly repository: ITransactionRepoSitory) {}

  async execute(transaction: BuiWalletTransactionsEntity): Promise<any> {
    await this.repository.createTransaction(transaction);
  }
}
