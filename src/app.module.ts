/* eslint-disable prettier/prettier */
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { WalletModule } from './bui-wallet/wallet.module';
import { BuiCollaboratorsModule } from './bui-collaborators/bui-collaborators.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './shared/jwt/jwt-constants';
import { PrismaClientExceptionFilter } from './shared/exceptions/prisma-client-exception/prisma-client-exception.filter';
import { APP_FILTER } from '@nestjs/core';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WalletModule,
    BuiCollaboratorsModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn:jwtConstants.expire},
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter,
    },
     
  ],
  exports:[]
})
export class AppModule {}
