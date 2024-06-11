/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { BuiWalletCustomersEntity } from 'src/bui-wallet/core/domain/entities/bui-wallet-customers.entity';
import { ICustomerRepository } from 'src/bui-wallet/core/domain/repositories/customer.repository';
import { WalletPrismaService } from '../database/prisma/wallet.prisma.service';
import { log } from 'console';
import { AuthenticationException } from 'src/shared/exceptions/custom-exception';

@Injectable()
export class CustomerRepositoryImpl implements ICustomerRepository {
  constructor(
    @Inject('WalletPrismaService')
    private walletPrismaService: WalletPrismaService,
    private jwtService: JwtService,
  ) {}

  async login(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const customer = await this.walletPrismaService.getCustomer(username);
    if (customer) {
      const isPasswordValid = await bcrypt.compare(password, customer.password);
      if (!isPasswordValid) {
        throw new AuthenticationException('Password incorrect',HttpStatus.BAD_REQUEST);
      }
      const payload = {
        sub: customer.id,
        username: customer.username,
        transactions: customer.transactions,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new AuthenticationException('User not found',HttpStatus.NOT_FOUND);
    }
  }
  async save(
    customer: BuiWalletCustomersEntity,
  ): Promise<{ access_token: string }> {
    const salt = await bcrypt.genSalt();
    const passwordHashed = await bcrypt.hash(customer.password, salt);

    await this.walletPrismaService.createCustomer(
      customer.username,
      passwordHashed,
    );
    const payload = { sub: customer.id, username: customer.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}