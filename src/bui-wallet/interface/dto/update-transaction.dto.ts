/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { BuiWalletTransactionsEntity, TransactionType } from 'src/bui-wallet/core/domain/entities/bui-wallet-transactions.entity';
import { CreateTransactionDto } from './create-transaction.dto';



export class UpdateTransactionDto{
  @ApiProperty()
  @IsString()
  description: string;
}
