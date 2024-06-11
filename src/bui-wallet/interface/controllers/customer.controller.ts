/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Catch, Controller, HttpCode, HttpException, HttpStatus, Post, Res, UseFilters } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { BuiWalletCustomersEntity } from 'src/bui-wallet/core/domain/entities/bui-wallet-customers.entity';
import { CreateCustomerUseCase } from 'src/bui-wallet/core/application/usecases/create-customer.usecase';
import { GetCustomerUseCase } from 'src/bui-wallet/core/application/usecases/get-customer.usecase';
import { GetCustomerDto } from '../dto/get-customer.dto';
import { ApiTags } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from 'src/shared/exceptions/prisma-client-exception/prisma-client-exception.filter';



@ApiTags('Customers')
@UseFilters(PrismaClientExceptionFilter) //manage prisma exceptions on database
@Controller('api/v1/customers/')
export class CustomerController {
  constructor(
    private createCustomerUseCase: CreateCustomerUseCase,
    private GetCustomerUseCase: GetCustomerUseCase,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body() createCustomerDto: CreateCustomerDto,
    
  ): Promise<Partial<BuiWalletCustomersEntity>| HttpException> {
      return await this.createCustomerUseCase.execute(createCustomerDto);
  }
  
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() getCustomerDto: GetCustomerDto,
  ): Promise<Partial<BuiWalletCustomersEntity>| HttpException> {
    return await this.GetCustomerUseCase.execute(
      getCustomerDto.username,
      getCustomerDto.password,
    );
  }
}
