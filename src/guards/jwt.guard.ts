import { Injectable, CanActivate, ExecutionContext, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Guard } from './guard';
import { AuthenticationService } from 'services/authentication.service';

@Injectable()
export class JwtGuard extends Guard implements CanActivate {
  constructor(private readonly authenticationService: AuthenticationService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = JwtGuard.getRequest(context);
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      throw new BadRequestException('Authorization header not found.');
    }

    const [type, token] = authorizationHeader.split(' ');
    if (type !== 'Bearer') {
      throw new BadRequestException(`Authentication type 'Bearer' required. Found '${type}`);
    }

    const validatedUser = await this.authenticationService.validateToken(token);
    if (validatedUser) {
      request.user = validatedUser;
      return true;
    }

    throw new UnauthorizedException('Token not valid');
  }
}
