import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { DataLoaderInterceptor } from './dataloader.interceptor';
import { NEST_LOADER_CONTEXT_KEY } from './dataloader.types';

export const Loader = createParamDecorator(
  async (data: any, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context).getContext();

    if (ctx[NEST_LOADER_CONTEXT_KEY] === undefined) {
      throw new InternalServerErrorException(
        `You should provide interceptor ${DataLoaderInterceptor.name} globally with ${APP_INTERCEPTOR}`,
      );
    }

    const loader = await ctx[NEST_LOADER_CONTEXT_KEY].getLoader(data);
    return loader;
  },
);
