import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'node:path';

import * as config from './config';
import { validationSchema } from './validation-schema';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { PrismaExceptionFilter } from './filters';
import { WriteAccessGuard } from './guards';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [...Object.values(config)],
      validationSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      includeStacktraceInErrorResponses: false,
      graphiql: true,
      formatError: (formatted) => {
        const ext = formatted.extensions ?? {};
        const original = ext.originalError as
          { statusCode?: number; message?: string | string[] } | undefined;

        const code =
          original?.statusCode === 400
            ? 'BAD_USER_INPUT'
            : (ext.code ?? 'INTERNAL_SERVER_ERROR');

        return {
          message: formatted.message,
          path: formatted.path,
          extensions: {
            code,
            ...(code === 'BAD_USER_INPUT' && original?.message
              ? {
                  details: Array.isArray(original.message)
                    ? original.message
                    : [original.message],
                }
              : {}),
          },
        };
      },
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: WriteAccessGuard,
    },
  ],
})
export class SharedModule {}
