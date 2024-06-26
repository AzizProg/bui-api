/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { BuiWalletCustomersEntity } from 'src/bui-wallet/core/domain/entities/bui-wallet-customers.entity';



export class CreateCustomerDto implements BuiWalletCustomersEntity {

  @IsNotEmpty()
  @ApiProperty()
  @Length(4)
  username: string;
  @IsNotEmpty()
  @ApiProperty()
  @Length(8)
  password: string;
}
