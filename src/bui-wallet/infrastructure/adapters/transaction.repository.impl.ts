/* eslint-disable @typescript-eslint/no-unused-vars */

import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { log } from 'console';
import { BuiWalletTransactionsEntity } from 'src/bui-wallet/core/domain/entities/bui-wallet-transactions.entity';
import { ITransactionRepoSitory } from 'src/bui-wallet/core/domain/repositories/transaction.repository';
import { WalletPrismaService } from '../database/prisma/wallet.prisma.service';

@Injectable()
export class TransactionRepositoryImpl implements ITransactionRepoSitory {
  constructor(   @Inject("WalletPrismaService") private walletPrismaService: WalletPrismaService,) {}

  async findCustomerTransactionsById(
    token_id: string,
  ): Promise<BuiWalletTransactionsEntity[]> {
    return await this.walletPrismaService.findCustomerTransactions(token_id);
  }

  async createTransaction(
    transaction: BuiWalletTransactionsEntity,
  ): Promise<BuiWalletTransactionsEntity> {

   return  await this.walletPrismaService.saveTransaction(transaction);
  }

  async findById(transaction_id: number): Promise<BuiWalletTransactionsEntity> {
   return await this.walletPrismaService.findTransactionById(transaction_id) 
  }

  async updateTransaction(transaction_id:number,description: string): Promise<BuiWalletTransactionsEntity> {
      return await this.walletPrismaService.updateTransaction(transaction_id,description);
  }
  async deleteTransaction(transaction_id: number): Promise<any> {
      return await this.walletPrismaService.deleteTransaction(transaction_id);
  }

}
