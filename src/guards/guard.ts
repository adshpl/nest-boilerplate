import { Injectable, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export abstract class Guard {
  static getRequest(context: ExecutionContext) {
    const executionContext = GqlExecutionContext.create(context);
    return executionContext.getContext().req;
  }
}
