import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ICollaboratorDB } from '../collaborator.database';

@Injectable()
export class CollaboratorPrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy, ICollaboratorDB
{
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async createCollaborator(username: string, password: string): Promise<any> {
    return await this.buiCollaborators.create({
      data: {
        username: username,
        password: password,
      },
    });
  }

  async getCollabotor(username: string): Promise<any> {
    return await this.buiCollaborators.findUnique({
      where: {
        username: username,
      },
    });
  }
  async findAllCustomers(): Promise<any> {
    return await this.buiWalletCustomers.findMany();
  }
  async findAllTransactions(): Promise<any> {
    return await this.buiWalletTransactions.findMany({
      include: {
        customer: true,
      },
    });
  }
  async findTransactionById(transaction_id: number): Promise<any> {
    return await this.buiWalletTransactions.findUnique({
      where: {
        id: transaction_id,
      },
      include: {
        customer: true,
      },
    });
  }
  async findCustomerById(customer_id: number): Promise<any> {
    return await this.buiWalletCustomers.findUnique({
      where: {
        id: customer_id,
      },
      include: {
        transactions: true,
      },
    });
  }
}
