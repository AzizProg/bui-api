/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  ExceptionFilter,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  ParseIntPipe,
  UseFilters,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { JwtGuard } from 'src/shared/jwt/jwt-guard';
import { log } from 'console';
import { FindCustomerTransactionsUseCase } from 'src/bui-wallet/core/application/usecases/find-customers-transactions.usescase';
import { FindTransactionByIdUseCase } from 'src/bui-wallet/core/application/usecases/find-transaction-by-id.usecase';
import { Token } from 'src/shared/security/token';
import { CreateTransactionUseCase } from 'src/bui-wallet/core/application/usecases/create-transaction.usecase';
import { BuiWalletTransactionsEntity } from 'src/bui-wallet/core/domain/entities/bui-wallet-transactions.entity';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateTransactionUseCase } from 'src/bui-wallet/core/application/usecases/update-transaction.usecase';
import { DeleteTransactionUseCase } from 'src/bui-wallet/core/application/usecases/delete-transaction.usecase';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { PrismaClientExceptionFilter } from 'src/shared/exceptions/prisma-client-exception/prisma-client-exception.filter';

@ApiTags('Transactions')
@ApiUnauthorizedResponse({
  description: 'Access token expire or not available',
})
@Controller('api/v1/transactions/')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@UseFilters(PrismaClientExceptionFilter)
export class TransactionController {
  constructor(
    private findCustomerTransactionsUseCase: FindCustomerTransactionsUseCase,
    private findTransactionByIdUseCase: FindTransactionByIdUseCase,
    private createTransactionUseCase: CreateTransactionUseCase,
    private updateTransactionUseCase: UpdateTransactionUseCase,
    private deleteTransactionUseCase: DeleteTransactionUseCase,
    private token: Token,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async saveTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<BuiWalletTransactionsEntity> {
    return await this.createTransactionUseCase.execute(createTransactionDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getCustomerTransactions(
    @Req() req,
  ): Promise<Partial<BuiWalletTransactionsEntity[]> | any> {
    try {
      const id = await this.token.extractToken(req);
      return await this.findCustomerTransactionsUseCase.execute(id);
    } catch (error) {
      log(error);
      return new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
  }
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @ApiNotFoundResponse({
    description: 'Transaction not found',
  })
  async getOneTransactionById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Partial<BuiWalletTransactionsEntity>> {
    return await this.findTransactionByIdUseCase.execute(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @ApiNotFoundResponse({
    description: 'Transaction not found',
  })
  @ApiOkResponse({ description: 'Transaction updated' })
  @ApiNotFoundResponse({
    description: 'Transaction not found',
  })
  async updateTransaction(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ): Promise<BuiWalletTransactionsEntity> {
    return await this.updateTransactionUseCase.execute(
      id,
      updateTransactionDto.description,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Transaction deleted' })
  @ApiNotFoundResponse({
    description: 'Transaction not found',
  })
  async deleteTransaction(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteTransactionUseCase.execute(id);
  }
}
