import { Inject } from '@nestjs/common';
import { ITransactionRepoSitory } from '../../domain/repositories/transaction.repository';
import { TransactionRepositoryImpl } from 'src/bui-wallet/infrastructure/adapters/transaction.repository.impl';


export class DeleteTransactionUseCase {
  constructor(@Inject(TransactionRepositoryImpl) private readonly repository: ITransactionRepoSitory) {}

  async execute(transaction_id: number): Promise<void> {
    await this.repository.deleteTransaction(transaction_id);
  }
}
