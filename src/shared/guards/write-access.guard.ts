import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { OperationTypeNode, GraphQLError, GraphQLResolveInfo } from 'graphql';

import { writeAccessConfig } from '../config';

@Injectable()
export class WriteAccessGuard implements CanActivate {
  constructor(
    @Inject(writeAccessConfig.KEY)
    private readonly accessConfig: ConfigType<typeof writeAccessConfig>,
  ) {}

  canActivate(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    const { operation } = gqlContext.getInfo<GraphQLResolveInfo>();

    if (operation.operation !== OperationTypeNode.MUTATION) return true;

    const request = gqlContext.getContext<{
      req: { headers: Record<string, string> };
    }>().req;
    if (request?.headers['x-api-key'] !== this.accessConfig.apiKey) {
      throw new GraphQLError(
        'Valid x-api-key header is required for mutations',
        {
          extensions: { code: 'FORBIDDEN' },
        },
      );
    }

    return true;
  }
}
