import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtBlacklistService {
  private static instance: JwtBlacklistService;

  private readonly blacklistAccessTokens: Set<string>;

  constructor() {
    this.blacklistAccessTokens = new Set();

    if (JwtBlacklistService.instance) {
      return JwtBlacklistService.instance;
    }

    JwtBlacklistService.instance = this;
  }

  addToBlacklistAccessToken(token: string): void {
    this.blacklistAccessTokens.add(token);
  }

  isAccessTokenBlacklisted(token: string): boolean {
    return this.blacklistAccessTokens.has(token);
  }
}
