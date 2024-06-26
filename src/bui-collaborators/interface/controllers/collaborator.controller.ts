import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CreateCollaboratorUseCase } from 'src/bui-collaborators/core/application/usecases/create-collaborator.usecase';
import { FindAllCustomerUseCase } from 'src/bui-collaborators/core/application/usecases/find-all-customer.usecase';
import { FindAllTransactionsUseCase } from 'src/bui-collaborators/core/application/usecases/find-all-transactions.usecase.ts';
import { FindCollabaratorUseCase } from 'src/bui-collaborators/core/application/usecases/find-collabarator.usecase.usescase';
import { CreateCollaboratorDto } from '../dto/create-collaborator.dto';
import { GetCollaboratorDto } from '../dto/get-collaborator.dto';
import { BuiWalletCustomersEntity } from 'src/bui-wallet/core/domain/entities/bui-wallet-customers.entity';
import { JwtGuard } from 'src/shared/jwt/jwt-guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from 'src/shared/exceptions/prisma-client-exception/prisma-client-exception.filter';
import { FindTransactionById } from 'src/bui-collaborators/core/application/usecases/find-transaction-by-id.usecase';
import { BuiWalletTransactionsEntity } from 'src/bui-wallet/core/domain/entities/bui-wallet-transactions.entity';
import { FindCustomerById } from 'src/bui-collaborators/core/application/usecases/find-customer-by-id.usecase';

@ApiTags('Collaborators')
@ApiUnauthorizedResponse({
  description: 'Access token expire or not available',
})
@Controller('api/v1/collaborators/')
export class CollaboratorConttroller {
  constructor(
    private createCollaborator: CreateCollaboratorUseCase,
    private getCollaborator: FindCollabaratorUseCase,
    private findAllTransactions: FindAllTransactionsUseCase,
    private findAllCustomers: FindAllCustomerUseCase,
    private findTransactionById: FindTransactionById,
    private findCustomerById: FindCustomerById,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    description: 'Colaborator has been created',
  })
  @ApiConflictResponse({
    description: 'Collaborator exist',
  })
  @UseFilters(PrismaClientExceptionFilter)
  async register(
    @Body() createCollaboratorDto: CreateCollaboratorDto,
  ): Promise<{ access_token: string }> {
    return this.createCollaborator.execute(createCollaboratorDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Connection successful',
  })
  @ApiNotFoundResponse({
    description: 'Collaborator not found',
  })
  @ApiBadRequestResponse({
    description: 'Incorrect password',
  })
  @ApiBearerAuth()
  async login(
    @Body() getCollaboratorDto: GetCollaboratorDto,
  ): Promise<{ access_token: string }> {
    return this.getCollaborator.execute(getCollaboratorDto);
  }

  @Get('transactions')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @ApiUnauthorizedResponse({
    description: 'Access token expire or not available',
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async getTransactions(): Promise<BuiWalletTransactionsEntity[]> {
    return this.findAllTransactions.execute();
  }

  @Get('transactions/:id')
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({
    description: 'Access token expire or not available',
  })
  @ApiNotFoundResponse({
    description: 'Transaction not found',
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async getTransactionById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuiWalletTransactionsEntity> {
    return this.findTransactionById.execute(id);
  }

  @Get('customers')
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({
    description: 'Access token expire or not available',
  })
  @UseGuards(JwtGuard)
  async getCustomers(): Promise<BuiWalletCustomersEntity[]> {
    return this.findAllCustomers.execute();
  }
  @Get('customers/:id')
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({
    description: 'Access token expire or not available',
  })
  @ApiNotFoundResponse({
    description: 'Customer not found',
  })
  @UseGuards(JwtGuard)
  async getCustomerById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuiWalletCustomersEntity[]> {
    return this.findCustomerById.execute(id);
  }
}
