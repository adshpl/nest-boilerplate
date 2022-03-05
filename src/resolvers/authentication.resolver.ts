import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Register } from 'models/authentication/register.model';
import { Login } from 'models/authentication/login.model';
import { RegisterArgs } from 'models/authentication/register.args';
import { LoginArgs } from 'models/authentication/login.args';
import { AuthenticationService } from 'services/authentication.service';

@Resolver()
export class AuthenticationResolver {
  constructor(private authenticationService: AuthenticationService) {}

  @Mutation(() => Register)
  async register(@Args() args: RegisterArgs) {
    const {
      username,
      login,
      password,
    } = args;

    const { id, createdAt } = await this.authenticationService.register(username, login, password);

    return {
      id,
      username,
      login,
      createdAt,
    };
  }

  @Mutation(() => Login)
  async login(@Args() args: LoginArgs) {
    const {
      login,
      password,
    } = args;

    const token = await this.authenticationService.login(login, password);
    return {
      token,
    };
  }

  @Query(() => String)
  hello() {
    return '123';
  }
}
