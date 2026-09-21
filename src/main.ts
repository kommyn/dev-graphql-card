import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
// import { GraphQLError } from 'node_modules/graphql/error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { snapshot: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      // exceptionFactory: (errors) => new GraphQLError('Validation failed', {
      //   extensions: {
      //     code: 'BAD_INPUT',
      //     fields: errors.map((error) => ({
      //       field: error.property,
      //       messages: Object.values(error.constraints || {})
      //     }))
      //   }
      // })
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
