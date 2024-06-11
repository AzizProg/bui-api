/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { FastifyReply } from 'fastify';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const message = exception.message.replace(/\n/g, '');
    let status: HttpStatus;

    switch (exception.code) {
      case 'P2000': // Value too long for column
        status = HttpStatus.BAD_REQUEST;
        this.sendResponse(response, 'The provided value is too long for the column.', status);
        break;
      case 'P2001': // Record not found
        status = HttpStatus.NOT_FOUND;
        this.sendResponse(response, 'The record was not found.', status);
        break;
      case 'P2002': // Unique constraint failed
        status = HttpStatus.CONFLICT;
        this.sendResponse(response, 'A unique constraint failed on the database.', status);
        break;
      case 'P2003': // Foreign key constraint failed
        status = HttpStatus.BAD_REQUEST;
        this.sendResponse(response, 'A foreign key constraint failed on the database.', status);
        break;
      case 'P2004': // Constraint violation
        status = HttpStatus.BAD_REQUEST;
        this.sendResponse(response, 'A constraint violation occurred.', status);
        break;
      case 'P2005': // Invalid value
        status = HttpStatus.BAD_REQUEST;
        this.sendResponse(response, 'The value provided is invalid for the column.', status);
        break;
      case 'P2006': // Invalid data
        status = HttpStatus.BAD_REQUEST;
        this.sendResponse(response, 'The provided data is invalid.', status);
        break;
      case 'P2007': // Data validation error
        status = HttpStatus.BAD_REQUEST;
        this.sendResponse(response, 'Data validation error.', status);
        break;
      case 'P2008': // Failed to parse the query
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        this.sendResponse(response, 'Failed to parse the query.', status);
        break;
      case 'P2009': // Failed to validate the query
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        this.sendResponse(response, 'Failed to validate the query.', status);
        break;
      case 'P2010': // Raw query failed
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        this.sendResponse(response, 'Raw query failed.', status);
        break;
      case 'P2011': // Null constraint violation
        status = HttpStatus.BAD_REQUEST;
        this.sendResponse(response, 'Null constraint violation.', status);
        break;
      case 'P2012': // Missing a required value
        status = HttpStatus.BAD_REQUEST;
        this.sendResponse(response, 'Missing a required value.', status);
        break;
      case 'P2013': // Missing the required argument
        status = HttpStatus.BAD_REQUEST;
        this.sendResponse(response, 'Missing the required argument.', status);
        break;
      case 'P2014': // The change you are trying to make would violate the required relation
        status = HttpStatus.BAD_REQUEST;
        this.sendResponse(response, 'The change would violate the required relation.', status);
        break;
      case 'P2015': // A related record could not be found
        status = HttpStatus.NOT_FOUND;
        this.sendResponse(response, 'A related record could not be found.', status);
        break;
      case 'P2016': // Query interpretation error
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        this.sendResponse(response, 'Query interpretation error.', status);
        break;
      case 'P2017': // The records for the relation are not connected
        status = HttpStatus.BAD_REQUEST;
        this.sendResponse(response, 'The records for the relation are not connected.', status);
        break;
      case 'P2018': // The required connected records were not found
        status = HttpStatus.NOT_FOUND;
        this.sendResponse(response, 'The required connected records were not found.', status);
        break;
      case 'P2019': // Input error
        status = HttpStatus.BAD_REQUEST;
        this.sendResponse(response, 'Input error.', status);
        break;
      case 'P2020': // Value out of range for the type
        status = HttpStatus.BAD_REQUEST;
        this.sendResponse(response, 'Value out of range for the type.', status);
        break;
      case 'P2021': // Table does not exist
        status = HttpStatus.NOT_FOUND;
        this.sendResponse(response, 'The table does not exist in the database.', status);
        break;
      case 'P2022': // Column does not exist
        status = HttpStatus.NOT_FOUND;
        this.sendResponse(response, 'The column does not exist in the database.', status);
        break;
      case 'P2023': // Inconsistent column data
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        this.sendResponse(response, 'Inconsistent column data.', status);
        break;
      case 'P2024': // Timed out fetching a resource
        status = HttpStatus.GATEWAY_TIMEOUT;
        this.sendResponse(response, 'Timed out fetching a resource.', status);
        break;
      case 'P2025': // Record to delete does not exist
        status = HttpStatus.NOT_FOUND;
        this.sendResponse(response, 'ressource not found', status);
        break;
      default:
        super.catch(exception, host);
        break;
    }
  }

  sendResponse(response: FastifyReply, message: string, status: HttpStatus) {
    response.status(status).send({
      statusCode: status,
      message,
    });
  }
}
