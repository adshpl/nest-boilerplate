import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const executionContext = GqlExecutionContext.create(context);
  return executionContext.getContext().req.user;
});
