import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'services/users.service';
import { Process } from 'constants/process';
import { AlreadyRegisteredException } from 'exceptions/already-registered.exception';
import { UserNotFoundOrPasswordDoesNotMatchException } from 'exceptions/user-not-found-or-password-does-not-match.exception';

const { PASSWORD_SALT_ROUNDS } = Process;

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(username: string, login: string, password: string) {
    const user = await this.usersService.findOne(login, username);
    if (user) {
      throw new AlreadyRegisteredException();
    }

    const saltedPassword = await bcrypt.hash(password, Number(PASSWORD_SALT_ROUNDS));
    return this.usersService.create(username, login, saltedPassword);
  }

  async login(login: string, password: string) {
    const user = await this.usersService.findOne(login);
    if (!user) {
      throw new UserNotFoundOrPasswordDoesNotMatchException();
    }

    const { id, passwordHash } = user;

    const isUserValid = AuthenticationService.validateUser(password, passwordHash);
    if (!isUserValid) {
      throw new UserNotFoundOrPasswordDoesNotMatchException();
    }

    return this.jwtService.sign({
      id,
    });
  }

  static async validateUser(password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
  }

  async validateToken(token: string) {
    const { id } = this.jwtService.verify(token);
    return this.usersService.findOneById(id);
  }
}
