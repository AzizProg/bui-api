/* eslint-disable prettier/prettier */

import { Inject } from '@nestjs/common';
import { ICustomerRepository } from '../../domain/repositories/customer.repository';
import { BuiWalletCustomersEntity } from '../../domain/entities/bui-wallet-customers.entity';
import { CustomerRepositoryImpl } from 'src/bui-wallet/infrastructure/adapters/customer.repository.impl';


export class CreateCustomerUseCase {

  constructor(@Inject(CustomerRepositoryImpl) private readonly repository: ICustomerRepository){
  }

  async execute(customer: BuiWalletCustomersEntity): Promise<Partial<BuiWalletCustomersEntity>> {
    return  await this.repository.save(customer);

  }
}
