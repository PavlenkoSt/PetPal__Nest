import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { usersRepositoryMock } from 'src/helpers/mocks';
import { CreateUserDto } from './dto/create-user.dto';
import { ConflictException } from 'src/exceptions/conflict.exception';
import { LOGIN_ALREADY_EXITS } from './users.constants';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: usersRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findOneById -> should return user without password', async () => {
    const id = '12';

    const user = await service.findOneById(id);

    expect(user).toBeDefined();
    expect(user.hashPassword).toBeUndefined();
    expect(user.password).toBeUndefined();
    expect(user.id).toBe(id);
  });

  it('create -> success', async () => {
    const createUserDto: CreateUserDto = {
      firstName: 'Vasya',
      lastName: 'Gordon',
      login: 'vasya-gordon',
      password: 'password',
    };

    const created = await service.create(createUserDto);

    expect(created).toBeDefined();
    expect(created.id).toBeDefined();
    expect(created.login).toBe(createUserDto.login);
    expect(created.firstName).toBe(createUserDto.firstName);
    expect(created.lastName).toBe(createUserDto.lastName);
    expect(created.passwordHash).toBeDefined();
  });

  it('create -> login exists error', async () => {
    const createUserDto: CreateUserDto = {
      firstName: 'Vasya',
      lastName: 'Gordon',
      login: 'existing-login',
      password: 'password',
    };

    await expect(service.create(createUserDto)).rejects.toThrowError(
      new ConflictException(LOGIN_ALREADY_EXITS),
    );
  });

  it('update => success', async () => {
    const id = '1';

    const updateUserDto: UpdateUserDto = {
      firstName: 'Vasya',
      lastName: 'Gordon',
      login: 'new-login',
      password: 'password',
    };

    const updated = await service.update(id, updateUserDto);

    expect(updated).toBeDefined();
    expect(updated.id).toBe(id);
    expect(updated.login).toBe(updateUserDto.login);
    expect(updated.lastName).toBe(updateUserDto.lastName);
    expect(updated.lastName).toBe(updateUserDto.lastName);
    expect(updated.passwordHash).toBeDefined();
  });

  it('update => login exists error', async () => {
    const id = '1';

    const updateUserDto: UpdateUserDto = {
      firstName: 'Vasya',
      lastName: 'Gordon',
      login: 'existing-login',
      password: 'password',
    };

    await expect(service.update(id, updateUserDto)).rejects.toThrowError(
      new ConflictException(LOGIN_ALREADY_EXITS),
    );
  });

  it('update => user not found (return null)', async () => {
    const id = '12';

    const updateUserDto: UpdateUserDto = {
      firstName: 'Vasya',
      lastName: 'Gordon',
      login: 'some-login',
      password: 'password',
    };

    const result = await service.update(id, updateUserDto);

    expect(result).toBeNull();
  });
});
