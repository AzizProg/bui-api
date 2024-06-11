/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import compression from '@fastify/compress';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from './shared/exceptions/prisma-client-exception/prisma-client-exception.filter';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

//cors for my client app
const corsOptions: CorsOptions = {
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors();
  //app.enableCors(corsOptions)
  //a requirement of technical test:use compression with nestjs
  await app.register(compression);

  app.useGlobalPipes(new ValidationPipe());

  ///for global filters use
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle('Bui Wallet Management')
    .setDescription(
      'Bui Wallet api documentation made for the technical test.\nTo access the resources you will need to insert the token you received when registering or logging in. Only registration and login do not require a token.',
    )
    .setVersion('1.0')
    .addBearerAuth({
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'Enter JWT access token in Bearer format',
    })
    .build();

  //Swagger configuration for api documentation
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  //You can change port server
  await app.listen(3001, '0.0.0.0');
}
bootstrap();
