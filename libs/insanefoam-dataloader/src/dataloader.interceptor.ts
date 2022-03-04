import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { NestDataLoader } from './dataloader.interface';
import { NEST_LOADER_CONTEXT_KEY } from './dataloader.types';

@Injectable()
export class DataLoaderInterceptor implements NestInterceptor {
  constructor(private readonly moduleRef: ModuleRef) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const graphqlExecutionContext = GqlExecutionContext.create(context);
    const ctx = graphqlExecutionContext.getContext() as ExecutionContext;

    if (!ctx) {
      return next.handle();
    }

    const isLoaderExists = ctx[NEST_LOADER_CONTEXT_KEY];

    if (isLoaderExists) {
      return next.handle();
    }

    ctx[NEST_LOADER_CONTEXT_KEY] = {
      contextId: ContextIdFactory.create(),
      getLoader: async (type: string): Promise<NestDataLoader<any, any>> => {
        if (ctx[type] === undefined) {
          try {
            const loader = this.moduleRef.get(type);

            const dataLoader = loader.generateDataLoader();
            ctx[type] = dataLoader;
          } catch (e) {
            throw new InternalServerErrorException(
              `The loader ${type} is not provided` + e,
            );
          }
        }
        return ctx[type];
      },
    };

    return next.handle();
  }
}
