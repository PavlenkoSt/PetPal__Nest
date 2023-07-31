import { Module } from '@nestjs/common';

import { JwtBlacklistService } from './jwt-blacklist.service';

@Module({
  providers: [JwtBlacklistService],
  exports: [JwtBlacklistService],
})
export class JwtBlacklistModule {}
