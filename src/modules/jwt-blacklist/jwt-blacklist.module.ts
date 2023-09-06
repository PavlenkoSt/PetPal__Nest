import { Module, Global } from '@nestjs/common';

import { JwtBlacklistService } from './jwt-blacklist.service';

@Global()
@Module({
  providers: [JwtBlacklistService],
  exports: [JwtBlacklistService],
})
export class JwtBlacklistModule {}
