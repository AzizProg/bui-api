/* eslint-disable prettier/prettier */

import { Inject} from '@nestjs/common';
import { ICustomerRepository } from '../../domain/repositories/customer.repository';
import { BuiWalletCustomersEntity } from '../../domain/entities/bui-wallet-customers.entity';
import { CustomerRepositoryImpl } from 'src/bui-wallet/infrastructure/adapters/customer.repository.impl';


export class GetCustomerUseCase {
  constructor(@Inject(CustomerRepositoryImpl) private readonly repository: ICustomerRepository) {}

  async execute(username: string,password:string): Promise<Partial<BuiWalletCustomersEntity>> {
   return await this.repository.login(username,password);

  }
}
