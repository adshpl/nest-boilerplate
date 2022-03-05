import * as lodash from 'lodash';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  create(username: string, login: string, passwordHash: string) {
    return this.usersRepository.save({
      username,
      login,
      passwordHash,
    });
  }

  findOne(login?: string, username?: string) {
    let options = null;

    if (login && username) {
      options = {
        where: [{
          username,
        }, {
          login,
        }],
      };
    } else {
      const currentOptions = {
        login,
        username,
      };

      options = lodash.pickBy(currentOptions, lodash.identity);
    }

    return this.usersRepository.findOne(options);
  }

  findOneById(id: string) {
    return this.usersRepository.findOne(id);
  }
}
