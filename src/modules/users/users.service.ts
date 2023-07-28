import { Injectable } from '@nestjs/common';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: '1',
      login: 'johnatan',
      firstName: 'John',
      lastName: 'Verbos',
      passwordHash: 'test password',
    },
  ];

  async findOneByLogin(login: string) {
    return this.users.find((user) => user.login === login);
  }

  async findoneById(id: string) {
    return this.users.find((user) => user.id === id);
  }
}
