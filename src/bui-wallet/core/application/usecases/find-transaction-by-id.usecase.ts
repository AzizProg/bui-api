/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Inject } from '@nestjs/common';
import { ITransactionRepoSitory } from '../../domain/repositories/transaction.repository';
import { BuiWalletTransactionsEntity } from '../../domain/entities/bui-wallet-transactions.entity';
import { TransactionRepositoryImpl } from 'src/bui-wallet/infrastructure/adapters/transaction.repository.impl';


export class FindTransactionByIdUseCase {
  constructor(@Inject(TransactionRepositoryImpl) private readonly repository: ITransactionRepoSitory) {}

  async execute(transaction_id:number): Promise<BuiWalletTransactionsEntity> {
   return await this.repository.findById(transaction_id);
  
  }
}
