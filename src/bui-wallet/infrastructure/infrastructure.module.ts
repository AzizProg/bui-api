import { Module } from '@nestjs/common';
import { CustomerRepositoryImpl } from './adapters/customer.repository.impl';
import { TransactionRepositoryImpl } from './adapters/transaction.repository.impl';

import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/shared/jwt/jwt-constants';
import { Token } from '../../shared/security/token';
import { WalletPrismaService } from './database/prisma/wallet.prisma.service';

@Module({
    providers:[
        CustomerRepositoryImpl,
        TransactionRepositoryImpl,
        Token,
          {
            provide:"WalletPrismaService",
            useClass:WalletPrismaService
        }
    ]
    ,
    exports:[
        CustomerRepositoryImpl,
        TransactionRepositoryImpl,
        Token,
 
    ],
    imports:[
    
    ]
})
export class InfrastructureModule {}
