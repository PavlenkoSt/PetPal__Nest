import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { RefreshTokensRepository } from './refresh-tokens.repository';
import { CreateTokenDto } from './dto/create-token.dto';
import { DeleteTokenDto } from './dto/delete-token.dto';

@Injectable()
export class RefreshTokensService {
  constructor(
    private readonly refreshTokensRepository: RefreshTokensRepository,
  ) {}

  get(token: string) {
    return this.refreshTokensRepository.get(token);
  }

  add(dto: CreateTokenDto) {
    return this.refreshTokensRepository.add(dto);
  }

  delete(dto: DeleteTokenDto) {
    return this.refreshTokensRepository.delete(dto);
  }

  @Cron('0 0 * * *')
  deleteAllExpired() {
    return this.refreshTokensRepository.deleteAllExpired();
  }
}
