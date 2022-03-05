import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Guard } from './guard';
import { ROLES_KEY } from 'decorators/roles.decorator';
import { Role } from 'enums/roles.enum';

@Injectable()
export class RolesGuard extends Guard implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = RolesGuard.getRequest(context);
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
