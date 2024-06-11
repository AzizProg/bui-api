/* eslint-disable @typescript-eslint/no-unused-vars */
import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { BuiWalletTransactionsEntity, TransactionType } from 'src/bui-wallet/core/domain/entities/bui-wallet-transactions.entity';



export class CreateTransactionDto implements BuiWalletTransactionsEntity {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  amount: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsEnum(TransactionType)
  @ApiProperty({ enum: TransactionType})
  type: TransactionType;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  customer_id: number;
}
