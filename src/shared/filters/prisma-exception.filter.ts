import { Catch, Logger } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql/error';

import { Prisma } from '../../generated/prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements GqlExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(exception: Prisma.PrismaClientKnownRequestError) {
    console.error('exception: ', exception);
    switch (exception.code) {
      case 'P2002':
        return new GraphQLError('Entry already exists', {
          extensions: { code: 'CONFLICT', fields: exception.meta?.target },
        });
      case 'P2025':
        return new GraphQLError('Entry noy found', {
          extensions: { code: 'NOT_FOUND' },
        });
      case 'P2003':
        return new GraphQLError('Related entry not found', {
          extensions: {
            code: 'BAD_USER_INPUT',
            field: exception.meta?.field_name,
          },
        });
      case 'P2023':
        return new GraphQLError('Incorrect identifier', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      default:
        this.logger.error(
          `Prisma ${exception.code}: ${exception.message}`,
          exception.stack,
        );
        return new GraphQLError('Internal server error', {
          extensions: { code: 'INTERNAL_SERVER_ERROR' },
        });
    }
  }
}
