import { ICollaboratorRepository } from 'src/bui-collaborators/core/domain/ports/collaborator.repository';
import { ICollaboratorDB } from '../database/collaborator.database';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { BuiWalletTransactionsEntity } from 'src/bui-wallet/core/domain/entities/bui-wallet-transactions.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { log } from 'console';

@Injectable()
export class CollaboratorRepositoryImpl implements ICollaboratorRepository {
  constructor(
    @Inject('CollaboratorPrismaService')
    private collaboratorDb: ICollaboratorDB,
    private jwtService: JwtService,
  ) {}

//get collaborator
  async findCollaborator(
    name: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const collabarator = await this.collaboratorDb.getCollabotor(name);
    if (!collabarator) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      collabarator.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('Password not true', HttpStatus.FORBIDDEN);
    }
    const payload = {
      sub: collabarator.id,
      username: collabarator.username,
      transactions: collabarator.transactions,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async findAllTransactions(): Promise<BuiWalletTransactionsEntity[]> {
    return await this.collaboratorDb.findAllTransactions();
  }
  async findAllCustomers(): Promise<BuiWalletTransactionsEntity[]> {
    return await this.collaboratorDb.findAllCustomers();
  }

  //create collaborator
  async createCollaborator(
    username: string,
    password,
  ): Promise<{ access_token: string }> {
    const salt = await bcrypt.genSalt();
    const passwordHashed = await bcrypt.hash(password, salt);
    try {
      const collabarator = await this.collaboratorDb.createCollaborator(
        username,
        passwordHashed,
      );
      const payload = { sub: collabarator.id, username: collabarator.username };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      log(error.message);
    }
  }


  async findTransactionById(transaction_id:number): Promise<BuiWalletTransactionsEntity> {
    return await this.collaboratorDb.findTransactionById(transaction_id);
  }

  async findCustomerById(customer_id: number): Promise<any> {
    return await this.collaboratorDb.findCustomerById(customer_id)
  }
}
