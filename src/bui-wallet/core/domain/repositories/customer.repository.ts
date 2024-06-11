/* eslint-disable prettier/prettier */
import { BuiWalletCustomersEntity } from '../entities/bui-wallet-customers.entity';

export interface ICustomerRepository {
  save(customer: BuiWalletCustomersEntity): Promise<any>;

  login(
    username: string,
    password: string,
  ): Promise<any>;
}
