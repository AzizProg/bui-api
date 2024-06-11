import { Inject } from '@nestjs/common';

import { ITransactionRepoSitory } from '../../domain/repositories/transaction.repository';
import { TransactionRepositoryImpl } from 'src/bui-wallet/infrastructure/adapters/transaction.repository.impl';

export class UpdateTransactionUseCase {
  constructor(@Inject(TransactionRepositoryImpl) private readonly repository: ITransactionRepoSitory) {}

  async execute(transaction_id:number,description: string): Promise<any> {
    await this.repository.updateTransaction(transaction_id,description);
  }
}
