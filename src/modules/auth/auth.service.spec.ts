import { UnauthorizedException } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import {
  jwtBlacklistServiceMock,
  jwtServiceMock,
  usersServiceMock,
} from 'src/helpers/mocks';
import { JwtService } from '@nestjs/jwt';
import { JwtBlacklistService } from '../jwt-blacklist/jwt-blacklist.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
        {
          provide: JwtBlacklistService,
          useValue: jwtBlacklistServiceMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('login', async () => {
    const tokens = await service.login({
      id: '12' as unknown as ObjectId,
      login: 'verbatim',
    });

    expect(tokens).toBeDefined();
    expect(tokens.access_token).toBeDefined();
    expect(tokens.refresh_token).toBeDefined();
  });

  it('refreshToken -> success', async () => {
    const result = await service.refreshToken('random-token.asfasdasf.asdasf');

    expect(result).toBeDefined();
    expect(result.access_token).toBeDefined();
    expect(result.refresh_token).toBeDefined();
  });

  it('refreshToken -> error', async () => {
    await expect(service.refreshToken('')).rejects.toThrowError(
      new UnauthorizedException(),
    );
  });
});
