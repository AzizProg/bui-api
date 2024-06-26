import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IWalletDatabase } from '../wallet.database';
import { BuiWalletTransactionsEntity } from 'src/bui-wallet/core/domain/entities/bui-wallet-transactions.entity';
import { BuiWalletCustomersEntity } from 'src/bui-wallet/core/domain/entities/bui-wallet-customers.entity';

@Injectable()
export class WalletPrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy, IWalletDatabase
{
  constructor() {
    super();
  }
  async createCustomer(username: string, password: string): Promise<BuiWalletCustomersEntity> {
    return await this.buiWalletCustomers.create({
      data: {
        username: username,
        password: password,
 
      },
      
    });
  }
  async getCustomer(username): Promise<any> {
    return await this.buiWalletCustomers.findUnique({
      where: { username: username },
      include: { transactions: true },
    });
  }
  async saveTransaction(
    buiWalletTransactions: BuiWalletTransactionsEntity,
  ): Promise<BuiWalletTransactionsEntity> {
    return (await this.buiWalletTransactions.create({
      data: {
        amount: buiWalletTransactions.amount,
        description: buiWalletTransactions.description,
        customer_id: buiWalletTransactions.customer_id,
        type: buiWalletTransactions.type,
      },
    })) as BuiWalletTransactionsEntity;
  }
  async findTransactionById(transaction_id): Promise<BuiWalletTransactionsEntity> {
    return (await this.buiWalletTransactions.findUnique({
      where: { id: transaction_id },
    })) as BuiWalletTransactionsEntity;
  }
  async findCustomerTransactions(token_id: string): Promise<BuiWalletTransactionsEntity[]> {
    return await this.buiWalletTransactions.findMany({
      where: { customer_id: Number(token_id) },
    }) as BuiWalletTransactionsEntity[];
  }
  async updateTransaction(
    transaction_id: number,
    description: string,
  ): Promise<BuiWalletTransactionsEntity> {
    return (await this.buiWalletTransactions.update({
      data: {
        description: description,
      },
      where: {
        id: transaction_id,
      },
    })) as BuiWalletTransactionsEntity;
  }
  async deleteTransaction(
    transaction_id: number,
  ): Promise<BuiWalletTransactionsEntity> {
    return (await this.buiWalletTransactions.delete({
      where: {
        id: transaction_id,
      },
    })) as BuiWalletTransactionsEntity;
  }
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
